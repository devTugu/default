import { Role as DomainRole } from '@domain/authorization/entities/role.entity';
import { Permission as DomainPermission } from '@domain/authorization/entities/permission.entity';
import type { permissions, roles } from '../schema';

type RoleWithPermissions = typeof roles.$inferSelect & {
  rolePermissions?: Array<
    typeof import('../schema').rolePermissions.$inferSelect & {
      permission: typeof permissions.$inferSelect;
    }
  >;
};

export class RoleMapper {
  static toDomain(entity: RoleWithPermissions): DomainRole {
    const permissionList =
      entity.rolePermissions?.map(
        (rp) =>
          new DomainPermission(
            rp.permission.id,
            rp.permission.code,
            rp.permission.description ?? null,
          ),
      ) ?? [];
    return new DomainRole(
      entity.id,
      entity.name,
      entity.description ?? null,
      permissionList,
    );
  }
}

export class PermissionMapper {
  static toDomain(entity: typeof permissions.$inferSelect): DomainPermission {
    return new DomainPermission(
      entity.id,
      entity.code,
      entity.description ?? null,
    );
  }
}
