export const SITE_SETTINGS_TABS = ['base', 'security', 'audit'] as const;

export type SiteSettingsTab = (typeof SITE_SETTINGS_TABS)[number];

export function parseSiteSettingsTab(
  value: string | null | undefined,
): SiteSettingsTab {
  if (value === 'base') {
    return 'base';
  }
  if (value === 'audit') {
    return 'audit';
  }
  return 'security';
}

export function siteSettingsTabHref(
  pathname: string,
  tab: SiteSettingsTab,
): string {
  if (tab === 'security') {
    return pathname;
  }
  return `${pathname}?tab=${tab}`;
}
