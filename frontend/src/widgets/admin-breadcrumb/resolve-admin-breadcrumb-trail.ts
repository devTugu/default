import {
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { parseSiteSettingsTab } from '@/features/site-settings/lib/site-settings-tabs';
import { ROUTES } from '@/shared/config/routes';
import type { AdminBreadcrumbItem } from './types';

type NavLabelKey =
  | 'overview'
  | 'users'
  | 'roles'
  | 'permissions'
  | 'auditLogs'
  | 'siteSettings'
  | 'accessControl'
  | 'content'
  | 'system';

type RouteTrail = {
  sectionKey?: NavLabelKey;
  pageKey: NavLabelKey;
  href: string;
  icon: LucideIcon;
};

const ROUTE_TRAILS: Record<string, RouteTrail> = {
  [ROUTES.DASHBOARD]: {
    pageKey: 'overview',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  [ROUTES.USERS]: {
    sectionKey: 'accessControl',
    pageKey: 'users',
    href: ROUTES.USERS,
    icon: Users,
  },
  [ROUTES.ROLES]: {
    sectionKey: 'accessControl',
    pageKey: 'roles',
    href: ROUTES.ROLES,
    icon: Shield,
  },
  [ROUTES.PERMISSIONS]: {
    sectionKey: 'accessControl',
    pageKey: 'permissions',
    href: ROUTES.PERMISSIONS,
    icon: KeyRound,
  },
  [ROUTES.SITE_SETTINGS]: {
    sectionKey: 'content',
    pageKey: 'siteSettings',
    href: ROUTES.SITE_SETTINGS,
    icon: Settings,
  },
};

function pushSection(
  items: AdminBreadcrumbItem[],
  sectionKey: NavLabelKey,
  tNav: (key: NavLabelKey) => string,
) {
  items.push({ label: tNav(sectionKey) });
}

export function resolveAdminBreadcrumbTrail(input: {
  pathname: string;
  searchParams: URLSearchParams;
  tNav: (key: NavLabelKey) => string;
  tSiteSettingsTab: (key: 'tabBase' | 'tabSecurity' | 'tabAudit') => string;
}): AdminBreadcrumbItem[] {
  const trail = ROUTE_TRAILS[input.pathname];
  if (!trail) {
    return [{ label: input.tNav('overview'), icon: LayoutDashboard }];
  }

  const items: AdminBreadcrumbItem[] = [];

  if (trail.sectionKey) {
    pushSection(items, trail.sectionKey, input.tNav);
  }

  if (input.pathname === ROUTES.SITE_SETTINGS) {
    const tab = parseSiteSettingsTab(input.searchParams.get('tab'));
    items.push({
      label: input.tNav(trail.pageKey),
      href: ROUTES.SITE_SETTINGS,
      icon: trail.icon,
    });
    const tabKey =
      tab === 'base'
        ? 'tabBase'
        : tab === 'audit'
          ? 'tabAudit'
          : 'tabSecurity';
    items.push({
      label: input.tSiteSettingsTab(tabKey),
      icon: tab === 'audit' ? ClipboardList : Settings,
    });
    return items;
  }

  if (input.pathname === ROUTES.DASHBOARD) {
    items.push({ label: input.tNav(trail.pageKey), icon: trail.icon });
    return items;
  }

  items.push({
    label: input.tNav(trail.pageKey),
    icon: trail.icon,
  });

  return items;
}
