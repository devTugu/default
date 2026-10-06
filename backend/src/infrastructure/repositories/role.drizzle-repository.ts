import { Inject, Injectable } from '@nestjs/common';
import { and, asc, count, eq, inArray, isNull } from 'drizzle-orm';
import {
  CreateRoleData,
  IRoleRepository,
  UpdateRoleData,
} from '@domain/authorization/repositories/role.repository.interface';
import { Role as DomainRole } from '@domain/authorization/entities/role.entity';
import { PaginatedResult } from '@shared/types/pagination';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import {
  permissions,
  rolePermissions,
  roles,
  userRoles,
} from '../database/drizzle/schema';
import { RoleMapper } from '../database/drizzle/mappers/role.mapper';

const roleWithPermissions = {
  rolePermissions: {
    with: { permission: true },
  },
} as const;

@Injectable()
export class RoleDrizzleRepository implements IRoleRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {}

  async create(data: CreateRoleData): Promise<DomainRole> {
    const [insertResult] = await this.db.insert(roles).values({
      name: data.name.toUpperCase(),
      description: data.description,
    });
    const roleId = Number(insertResult.insertId);
    if (data.permissionIds?.length) {
      await this.syncPermissions(roleId, data.permissionIds);
    }
    return (await this.findById(roleId)) as DomainRole;
  }

  async findById(id: number): Promise<DomainRole | null> {
    const entity = await this.db.query.roles.findFirst({
      where: and(eq(roles.id, id), isNull(roles.deletedAt)),
      with: roleWithPermissions,
    });
    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<DomainRole>> {
    const whereClause = isNull(roles.deletedAt);
    const [items, totalRow] = await Promise.all([
      this.db.query.roles.findMany({
        where: whereClause,
        with: roleWithPermissions,
        orderBy: asc(roles.name),
        limit,
        offset: (page - 1) * limit,
      }),
      this.db.select({ value: count() }).from(roles).where(whereClause),
    ]);
    const total = totalRow[0]?.value ?? 0;
    return {
      items: items.map((item) => RoleMapper.toDomain(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, data: UpdateRoleData): Promise<DomainRole> {
    if (data.description !== undefined) {
      await this.db
        .update(roles)
        .set({ description: data.description })
        .where(and(eq(roles.id, id), isNull(roles.deletedAt)));
    }
    return (await this.findById(id)) as DomainRole;
  }

  async softDelete(id: number): Promise<void> {
    await this.db
      .update(roles)
      .set({ deletedAt: new Date() })
      .where(eq(roles.id, id));
  }

  async nameExists(name: string): Promise<boolean> {
    const rows = await this.db
      .select({ value: count() })
      .from(roles)
      .where(eq(roles.name, name.toUpperCase()));
    return (rows[0]?.value ?? 0) > 0;
  }

  async assignToUser(userId: number, roleId: number): Promise<void> {
    const existing = await this.db.query.userRoles.findFirst({
      where: and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)),
    });
    if (existing) throw new Error('DUPLICATE_USER_ROLE');
    await this.db.insert(userRoles).values({ userId, roleId });
  }

  async removeFromUser(userId: number, roleId: number): Promise<void> {
    const deleted = await this.db
      .delete(userRoles)
      .where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)));
    if (deleted[0].affectedRows === 0) throw new Error('USER_ROLE_NOT_FOUND');
  }

  async syncPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    const perms = await this.db
      .select({ id: permissions.id })
      .from(permissions)
      .where(inArray(permissions.id, permissionIds));
    if (!perms.length) return;
    await this.db.insert(rolePermissions).values(
      perms.map((p) => ({
        roleId,
        permissionId: p.id,
      })),
    );
  }

  async clearPermissions(roleId: number): Promise<void> {
    await this.db
      .delete(rolePermissions)
      .where(eq(rolePermissions.roleId, roleId));
  }

  async replacePermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .delete(rolePermissions)
        .where(eq(rolePermissions.roleId, roleId));
      if (!permissionIds.length) return;
      const perms = await tx
        .select({ id: permissions.id })
        .from(permissions)
        .where(inArray(permissions.id, permissionIds));
      if (!perms.length) return;
      await tx.insert(rolePermissions).values(
        perms.map((p) => ({
          roleId,
          permissionId: p.id,
        })),
      );
    });
  }

  async findUserIdsByRoleId(roleId: number): Promise<number[]> {
    const rows = await this.db
      .select({ userId: userRoles.userId })
      .from(userRoles)
      .where(eq(userRoles.roleId, roleId));
    return rows.map((row) => row.userId);
  }
}
