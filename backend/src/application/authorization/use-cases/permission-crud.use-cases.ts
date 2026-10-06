import { Inject, Injectable } from '@nestjs/common';
import { IPermissionRepository } from '@domain/authorization/repositories/permission.repository.interface';
import { AppErrors } from '@application/exceptions/application.exception';
import { PERMISSION_REPOSITORY } from '@shared/constants/tokens';
import { PaginatedResult } from '@shared/types/pagination';
import { Permission } from '@domain/authorization/entities/permission.entity';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissions: IPermissionRepository,
  ) {}

  async execute(code: string, description?: string): Promise<Permission> {
    const normalized = code.toUpperCase();
    if (await this.permissions.codeExists(normalized)) {
      throw AppErrors.CONFLICT('Permission code already exists.');
    }
    return this.permissions.create(normalized, description);
  }
}

@Injectable()
export class ListPermissionsUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissions: IPermissionRepository,
  ) {}

  execute(page = 1, limit = 20): Promise<PaginatedResult<Permission>> {
    return this.permissions.findAll(page, limit);
  }
}

@Injectable()
export class GetPermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissions: IPermissionRepository,
  ) {}

  async execute(id: number): Promise<Permission> {
    const permission = await this.permissions.findById(id);
    if (!permission) throw AppErrors.NOT_FOUND('Permission not found.');
    return permission;
  }
}

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissions: IPermissionRepository,
  ) {}

  async execute(id: number, description?: string): Promise<Permission> {
    const existing = await this.permissions.findById(id);
    if (!existing) throw AppErrors.NOT_FOUND('Permission not found.');
    return this.permissions.update(id, description);
  }
}

@Injectable()
export class DeletePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissions: IPermissionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.permissions.findById(id);
    if (!existing) throw AppErrors.NOT_FOUND('Permission not found.');
    await this.permissions.delete(id);
  }
}
