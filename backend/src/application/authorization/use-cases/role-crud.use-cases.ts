import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '@domain/authorization/repositories/role.repository.interface';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { ROLE_REPOSITORY, PERMISSION_CACHE } from '@shared/constants/tokens';
import { PaginatedResult } from '@shared/types/pagination';
import { Role } from '@domain/authorization/entities/role.entity';

@Injectable()
export class ListRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
  ) {}

  execute(page = 1, limit = 20): Promise<PaginatedResult<Role>> {
    return this.roles.findAll(page, limit);
  }
}

@Injectable()
export class GetRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
  ) {}

  async execute(id: number): Promise<Role> {
    const role = await this.roles.findById(id);
    if (!role) throw AppErrors.NOT_FOUND('Role not found.');
    return role;
  }
}

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
  ) {}

  async execute(
    id: number,
    input: { description?: string; permissionIds?: number[] },
  ): Promise<Role> {
    const existing = await this.roles.findById(id);
    if (!existing) throw AppErrors.NOT_FOUND('Role not found.');

    if (input.permissionIds !== undefined) {
      await this.roles.replacePermissions(id, input.permissionIds);
      const userIds = await this.roles.findUserIdsByRoleId(id);
      await Promise.all(userIds.map((userId) => this.cache.invalidate(userId)));
    }
    return this.roles.update(id, {
      description: input.description,
      permissionIds: input.permissionIds,
    });
  }
}

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
  ) {}

  async execute(id: number): Promise<void> {
    const role = await this.roles.findById(id);
    if (!role) throw AppErrors.NOT_FOUND('Role not found.');
    const userIds = await this.roles.findUserIdsByRoleId(id);
    await this.roles.softDelete(id);
    await Promise.all(userIds.map((userId) => this.cache.invalidate(userId)));
  }
}

@Injectable()
export class AssignRoleToUserUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
  ) {}

  async execute(userId: number, roleId: number): Promise<void> {
    const role = await this.roles.findById(roleId);
    if (!role) throw AppErrors.NOT_FOUND('Role not found.');
    try {
      await this.roles.assignToUser(userId, roleId);
    } catch (error) {
      if (error instanceof Error && error.message === 'DUPLICATE_USER_ROLE') {
        throw AppErrors.CONFLICT('User already has this role.');
      }
      throw error;
    }
    await this.cache.invalidate(userId);
  }
}

@Injectable()
export class RemoveRoleFromUserUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
  ) {}

  async execute(userId: number, roleId: number): Promise<void> {
    try {
      await this.roles.removeFromUser(userId, roleId);
    } catch (error) {
      if (error instanceof Error && error.message === 'USER_ROLE_NOT_FOUND') {
        throw AppErrors.NOT_FOUND('User-role assignment not found.');
      }
      throw error;
    }
    await this.cache.invalidate(userId);
  }
}
