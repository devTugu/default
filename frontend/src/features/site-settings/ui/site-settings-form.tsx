'use client';

import { Suspense, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@default/ui/primitives/button';
import { Form } from '@default/ui/primitives/form';
import { Skeleton } from '@default/ui/primitives/skeleton';
import { useAuthPermissions } from '@/features/auth';
import { AdminContentLocaleProvider } from '@/shared/i18n/admin-content-locale-context';
import { AdminContentLocaleTabs } from '@/shared/ui/admin-content-locale-tabs';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { SettingsSection } from '@/shared/ui/settings-section';
import {
  parseSiteSettingsTab,
  siteSettingsTabHref,
} from '../lib/site-settings-tabs';
import { SiteSettingsAuditSection } from './site-settings-audit-section';
import { SiteSettingsBaseSection } from './site-settings-base-section';
import { SiteSettingsBrandThemePreview } from './site-settings-brand-theme-preview';
import { SiteSettingsSecuritySection } from './site-settings-security-section';
import { SiteSettingsTabsNav } from './site-settings-tabs-nav';
import { useSiteSettingsForm } from './use-site-settings-form';

function SiteSettingsFormContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = parseSiteSettingsTab(searchParams.get('tab'));
  const { can } = useAuthPermissions();
  const canSiteSettings = can(PERMISSION_CODES.SITE_SETTING_READ);
  const canAudit = can(PERMISSION_CODES.AUDIT_READ);
  const {
    t,
    tCommon,
    canUpdate,
    isSuperAdmin,
    data,
    isLoading,
    form,
    updateSettings,
    onSubmit,
  } = useSiteSettingsForm({ enabled: canSiteSettings });

  useEffect(() => {
    if (canSiteSettings) {
      return;
    }
    if (canAudit && activeTab !== 'audit') {
      router.replace(siteSettingsTabHref(pathname, 'audit'));
    }
  }, [activeTab, canAudit, canSiteSettings, pathname, router]);

  const showBase = isSuperAdmin && activeTab === 'base';
  const showSecurity =
    canSiteSettings && (!isSuperAdmin || activeTab === 'security');
  const showAudit = canAudit && activeTab === 'audit';

  if (showBase && (isLoading || !data)) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t('pageTitle')}</h1>
        <p className="text-muted-foreground text-sm">{t('pageDescription')}</p>
      </header>

      <SiteSettingsTabsNav showBaseTab={isSuperAdmin} />

      {showBase && data ? (
        <AdminContentLocaleProvider resetKey={data.updatedAt}>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <SiteSettingsBrandThemePreview control={form.control} />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                {canUpdate ? (
                  <Button type="submit" disabled={updateSettings.isPending}>
                    {updateSettings.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    {tCommon('saveChanges')}
                  </Button>
                ) : null}
              </div>
              <AdminContentLocaleTabs className="rounded-lg border px-4" />
              <SettingsSection
                title={t('baseSectionTitle')}
                description={t('baseSectionDescription')}
              >
                <SiteSettingsBaseSection control={form.control} canUpdate={canUpdate} />
              </SettingsSection>
              <p className="text-muted-foreground text-xs">
                {t('lastUpdated', {
                  date: new Date(data.updatedAt).toLocaleString(),
                })}
              </p>
            </form>
          </Form>
        </AdminContentLocaleProvider>
      ) : null}

      {showSecurity ? (
        <SiteSettingsSecuritySection showPlatformPolicy={isSuperAdmin && canUpdate} />
      ) : null}

      {showAudit ? <SiteSettingsAuditSection /> : null}
    </div>
  );
}

export function SiteSettingsForm() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <SiteSettingsFormContent />
    </Suspense>
  );
}
