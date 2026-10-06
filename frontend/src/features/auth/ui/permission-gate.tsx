'use client';

import type { PermissionCode } from '@/shared/config/permissions';
import { useAuthPermissions } from '../hooks/use-permissions';

interface PermissionGateProps {
  permission: PermissionCode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can } = useAuthPermissions();
  if (!can(permission)) return <>{fallback}</>;
  return <>{children}</>;
}
