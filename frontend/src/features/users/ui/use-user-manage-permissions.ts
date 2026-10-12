'use client';

import { useAuthPermissions, useAuthStore } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import type { UserOutput } from '@/entities/user';

export function useUserManagePermissions(user: UserOutput | null) {
  const { can } = useAuthPermissions();
  const currentUser = useAuthStore((authState) => authState.user);
  const canDelete = can(PERMISSION_CODES.USER_DELETE);

  return {
    currentUser,
    canCreate: can(PERMISSION_CODES.USER_CREATE),
    canUpdate: can(PERMISSION_CODES.USER_UPDATE),
    canAssign: can(PERMISSION_CODES.ROLE_CREATE),
    canUnassign: can(PERMISSION_CODES.ROLE_DELETE),
    canDelete,
    canExport: can(PERMISSION_CODES.USER_READ),
    canAnonymize: canDelete && user !== null && currentUser?.id !== user.id,
  };
}
