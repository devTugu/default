import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { RequirePermission } from '@/features/auth';
import { AuditLogsTable } from '@/features/audit-logs';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { AdminPageHeader } from '@/widgets/admin-page-header';
import { Skeleton } from '@/shared/ui/skeleton';

export default async function AuditLogsPage() {
  const tNav = await getTranslations('nav');
  const t = await getTranslations('entities.auditLogs');

  return (
    <RequirePermission permission={PERMISSION_CODES.AUDIT_READ}>
      <div className="space-y-6">
        <AdminPageHeader title={tNav('auditLogs')} description={t('pageDescription')} />
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <AuditLogsTable />
        </Suspense>
      </div>
    </RequirePermission>
  );
}
