'use client';

import { useAuthStore } from '../model/store';
import { SUPER_ADMIN_ROLE } from '@/shared/config/permissions';
import type { PermissionCode } from '@/shared/config/permissions';

export const useAuthPermissions = () => {
  const roleNames = useAuthStore((s) => s.roleNames);
  const permissionCodes = useAuthStore((s) => s.permissionCodes);
  const user = useAuthStore((s) => s.user);

  const isSuperAdmin = roleNames.includes(SUPER_ADMIN_ROLE);
  const isAuthenticated = Boolean(user);

  const can = (code: PermissionCode): boolean => {
    if (!isAuthenticated) return false;
    if (isSuperAdmin) return true;
    return permissionCodes.includes(code);
  };

  return { can, isSuperAdmin, isAuthenticated, roleNames, permissionCodes };
};
