'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { cn } from '@/shared/lib/utils';
import {
  parseSiteSettingsTab,
  siteSettingsTabHref,
  type SiteSettingsTab,
} from '../lib/site-settings-tabs';

const TAB_KEYS: Record<
  SiteSettingsTab,
  'tabBase' | 'tabSecurity' | 'tabAudit'
> = {
  base: 'tabBase',
  security: 'tabSecurity',
  audit: 'tabAudit',
};

export function SiteSettingsTabsNav({
  showBaseTab,
}: {
  showBaseTab: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { can } = useAuthPermissions();
  const t = useTranslations('entities.siteSettings');
  const activeTab = parseSiteSettingsTab(searchParams.get('tab'));

  const tabs: SiteSettingsTab[] = [];
  if (showBaseTab) {
    tabs.push('base');
  }
  if (can(PERMISSION_CODES.SITE_SETTING_READ)) {
    tabs.push('security');
  }
  if (can(PERMISSION_CODES.AUDIT_READ)) {
    tabs.push('audit');
  }

  if (tabs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={t('tabsAriaLabel')}
      className="flex gap-6 overflow-x-auto border-b"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Link
            key={tab}
            href={siteSettingsTabHref(pathname, tab)}
            className={cn(
              'shrink-0 border-b-2 px-0.5 pb-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-foreground text-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {t(TAB_KEYS[tab])}
          </Link>
        );
      })}
    </nav>
  );
}
