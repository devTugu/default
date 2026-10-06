import { User as DomainUser } from '@domain/user/entities/user.entity';
import type { permissions, roles, userRoles } from '../schema';

type RoleWithPermissions = typeof roles.$inferSelect & {
  rolePermissions?: Array<
    typeof import('../schema').rolePermissions.$inferSelect & {
      permission: typeof permissions.$inferSelect;
    }
  >;
};

type UserRoleRow = typeof userRoles.$inferSelect & {
  role?: RoleWithPermissions;
};

export type UserWithAuthRelations =
  typeof import('../schema').users.$inferSelect & {
    userRoles?: UserRoleRow[];
  };

export class UserMapper {
  static toDomain(entity: UserWithAuthRelations, withAuth = false): DomainUser {
    const roleNames: string[] = [];
    const permissionCodes: string[] = [];

    if (withAuth && entity.userRoles) {
      for (const ur of entity.userRoles) {
        if (ur.role?.name) roleNames.push(ur.role.name);
        for (const rp of ur.role?.rolePermissions ?? []) {
          if (rp.permission?.code) permissionCodes.push(rp.permission.code);
        }
      }
    }

    return new DomainUser(
      entity.id,
      entity.email,
      entity.passwordHash,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
      [...new Set(roleNames)],
      [...new Set(permissionCodes)],
      entity.mfaEnabled,
      entity.oauthProvider,
    );
  }
}
