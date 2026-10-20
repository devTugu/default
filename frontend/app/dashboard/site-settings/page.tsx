'use client';

import { RequireAnyPermission } from '@/features/auth';
import { SiteSettingsForm } from '@/features/site-settings';
import { PERMISSION_CODES } from '@/shared/config/permissions';

export default function SiteSettingsPage() {
  return (
    <RequireAnyPermission
      permissions={[
        PERMISSION_CODES.SITE_SETTING_READ,
        PERMISSION_CODES.AUDIT_READ,
      ]}
    >
      <SiteSettingsForm />
    </RequireAnyPermission>
  );
}
