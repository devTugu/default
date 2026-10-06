'use client';

import { useTranslations } from 'next-intl';
import { RequirePermission } from '@/features/auth';
import { SiteSettingsForm } from '@/features/site-settings';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { AdminPageHeader } from '@/widgets/admin-page-header';

export default function SiteSettingsPage() {
  const tNav = useTranslations('nav');
  const t = useTranslations('entities.siteSettings');

  return (
    <RequirePermission permission={PERMISSION_CODES.SITE_SETTING_READ}>
      <div className="space-y-6">
        <AdminPageHeader title={tNav('siteSettings')} description={t('pageDescription')} />
        <SiteSettingsForm />
      </div>
    </RequirePermission>
  );
}
