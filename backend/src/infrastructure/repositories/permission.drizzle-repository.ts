import { Inject, Injectable } from '@nestjs/common';
import { count, eq, inArray } from 'drizzle-orm';
import { IPermissionRepository } from '@domain/authorization/repositories/permission.repository.interface';
import { Permission as DomainPermission } from '@domain/authorization/entities/permission.entity';
import { PaginatedResult } from '@shared/types/pagination';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { permissions } from '../database/drizzle/schema';
import { PermissionMapper } from '../database/drizzle/mappers/role.mapper';

@Injectable()
export class PermissionDrizzleRepository implements IPermissionRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {}

  async create(code: string, description?: string): Promise<DomainPermission> {
    const [result] = await this.db.insert(permissions).values({
      code,
      description,
    });
    const created = await this.findById(Number(result.insertId));
    if (!created) throw new Error('PERMISSION_CREATE_FAILED');
    return created;
  }

  async findById(id: number): Promise<DomainPermission | null> {
    const entity = await this.db.query.permissions.findFirst({
      where: eq(permissions.id, id),
    });
    return entity ? PermissionMapper.toDomain(entity) : null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<DomainPermission>> {
    const [items, totalRow] = await Promise.all([
      this.db.query.permissions.findMany({
        orderBy: permissions.code,
        limit,
        offset: (page - 1) * limit,
      }),
      this.db.select({ value: count() }).from(permissions),
    ]);
    const total = totalRow[0]?.value ?? 0;
    return {
      items: items.map((item) => PermissionMapper.toDomain(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, description?: string): Promise<DomainPermission> {
    await this.db
      .update(permissions)
      .set({ description })
      .where(eq(permissions.id, id));
    const updated = await this.findById(id);
    if (!updated) throw new Error('PERMISSION_NOT_FOUND');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(permissions).where(eq(permissions.id, id));
  }

  async codeExists(code: string): Promise<boolean> {
    const rows = await this.db
      .select({ value: count() })
      .from(permissions)
      .where(eq(permissions.code, code.toUpperCase()));
    return (rows[0]?.value ?? 0) > 0;
  }

  async findByIds(ids: number[]): Promise<DomainPermission[]> {
    if (!ids.length) return [];
    const entities = await this.db
      .select()
      .from(permissions)
      .where(inArray(permissions.id, ids));
    return entities.map((entity) => PermissionMapper.toDomain(entity));
  }
}
