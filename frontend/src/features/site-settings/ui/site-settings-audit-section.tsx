'use client';

import { useTranslations } from 'next-intl';
import { AuditLogsTable } from '@/features/audit-logs';
import { SettingsSection } from '@/shared/ui/settings-section';

export function SiteSettingsAuditSection() {
  const t = useTranslations('entities.auditLogs');

  return (
    <SettingsSection
      title={t('pageTitle')}
      description={t('pageDescription')}
      panel={false}
    >
      <AuditLogsTable />
    </SettingsSection>
  );
}
