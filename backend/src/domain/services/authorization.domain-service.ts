import { SUPER_ADMIN_ROLE } from '@shared/constants/rbac';

export class AuthorizationDomainService {
  isSuperAdmin(roleNames: string[]): boolean {
    return roleNames.includes(SUPER_ADMIN_ROLE);
  }

  hasAllPermissions(
    userPermissions: string[],
    required: string[],
    roleNames: string[],
  ): boolean {
    if (this.isSuperAdmin(roleNames)) return true;
    return required.every((p) => userPermissions.includes(p));
  }
}
