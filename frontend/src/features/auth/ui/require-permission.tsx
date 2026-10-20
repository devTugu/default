'use client';

import { ShieldOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { PermissionCode } from '@/shared/config/permissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@default/ui/primitives/card';
import { useAuthPermissions } from '../hooks/use-permissions';

interface RequirePermissionProps {
  permission: PermissionCode;
  children: React.ReactNode;
}

interface RequireAnyPermissionProps {
  permissions: PermissionCode[];
  children: React.ReactNode;
}

function AccessDenied() {
  const t = useTranslations('errors');
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldOff className="size-5 text-muted-foreground" />
          <CardTitle>{t('accessDeniedTitle')}</CardTitle>
        </div>
        <CardDescription>{t('accessDeniedTitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{t('accessDeniedContact')}</p>
      </CardContent>
    </Card>
  );
}

export function RequireAnyPermission({
  permissions,
  children,
}: RequireAnyPermissionProps) {
  const { can } = useAuthPermissions();
  if (!permissions.some((permission) => can(permission))) {
    return <AccessDenied />;
  }
  return <>{children}</>;
}

export function RequirePermission({
  permission,
  children,
}: RequirePermissionProps) {
  const { can } = useAuthPermissions();
  const t = useTranslations('errors');

  if (!can(permission)) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldOff className="size-5 text-muted-foreground" />
            <CardTitle>{t('accessDeniedTitle')}</CardTitle>
          </div>
          <CardDescription>
            {t('accessDeniedDescription', { permission })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{t('accessDeniedContact')}</p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}
