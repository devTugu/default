'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAdminBreadcrumbContext } from './admin-breadcrumb-context';
import { AdminInteractiveBreadcrumb } from './admin-interactive-breadcrumb';
import { resolveAdminBreadcrumbTrail } from './resolve-admin-breadcrumb-trail';

export function AdminBreadcrumbBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tNav = useTranslations('nav');
  const tSiteSettings = useTranslations('entities.siteSettings');
  const { override } = useAdminBreadcrumbContext();

  const items = useMemo(() => {
    if (override) {
      return override;
    }
    return resolveAdminBreadcrumbTrail({
      pathname,
      searchParams,
      tNav,
      tSiteSettingsTab: tSiteSettings,
    });
  }, [override, pathname, searchParams, tNav, tSiteSettings]);

  return (
    <AdminInteractiveBreadcrumb
      items={items}
      onBack={() => router.back()}
      onForward={() => router.forward()}
      className="mb-4 md:mb-5"
    />
  );
}
