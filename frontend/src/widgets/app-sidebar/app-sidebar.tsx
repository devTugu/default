'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Settings,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { env } from '@/shared/config/env';
import { ROUTES } from '@/shared/config/routes';
import {
  PERMISSION_CODES,
  type PermissionCode,
} from '@/shared/config/permissions';
import { useSiteSettings } from '@/entities/site-settings';
import { BrandLogo } from '@/shared/ui/brand-logo';
import { useAuthPermissions } from '@/features/auth';
import type { AppMessages } from '@/shared/i18n/messages';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { NavUser } from './nav-user';

type NavTitleKey = keyof AppMessages['nav'];

interface NavItem {
  titleKey: NavTitleKey;
  href: string;
  icon: typeof LayoutDashboard;
  permission?: PermissionCode;
}

const systemNavItems: NavItem[] = [
  {
    titleKey: 'overview',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    permission: PERMISSION_CODES.DASHBOARD_READ,
  },
  {
    titleKey: 'users',
    href: ROUTES.USERS,
    icon: Users,
    permission: PERMISSION_CODES.USER_READ,
  },
  {
    titleKey: 'roles',
    href: ROUTES.ROLES,
    icon: Shield,
    permission: PERMISSION_CODES.ROLE_READ,
  },
  {
    titleKey: 'permissions',
    href: ROUTES.PERMISSIONS,
    icon: KeyRound,
    permission: PERMISSION_CODES.PERMISSION_READ,
  },
  {
    titleKey: 'auditLogs',
    href: ROUTES.AUDIT_LOGS,
    icon: ClipboardList,
    permission: PERMISSION_CODES.AUDIT_READ,
  },
  {
    titleKey: 'security',
    href: ROUTES.SECURITY,
    icon: ShieldCheck,
  },
];

const contentNavItems: NavItem[] = [
  {
    titleKey: 'siteSettings',
    href: ROUTES.SITE_SETTINGS,
    icon: Settings,
    permission: PERMISSION_CODES.SITE_SETTING_READ,
  },
];

function NavSection({
  labelKey,
  items,
  pathname,
  can,
  tNav,
}: {
  labelKey: NavTitleKey;
  items: NavItem[];
  pathname: string;
  can: (code: PermissionCode) => boolean;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}) {
  const visibleItems = items.filter(
    (item) => !item.permission || can(item.permission),
  );

  if (visibleItems.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{tNav(labelKey)}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {visibleItems.map((item) => {
            const title = tNav(item.titleKey);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={title}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { can } = useAuthPermissions();
  const { data: siteSettings } = useSiteSettings();
  const tNav = useTranslations('nav');
  const adminLogoUrl = siteSettings?.header.adminLogoUrl ?? null;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={ROUTES.DASHBOARD}>
                {adminLogoUrl ? (
                  <BrandLogo
                    name={env.APP_NAME}
                    logoUrl={adminLogoUrl}
                    showName={false}
                    imageClassName="size-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Shield className="size-4" />
                  </div>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{env.APP_NAME}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {tNav('adminConsole')}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSection
          labelKey="system"
          items={systemNavItems}
          pathname={pathname}
          can={can}
          tNav={tNav}
        />
        <NavSection
          labelKey="content"
          items={contentNavItems}
          pathname={pathname}
          can={can}
          tNav={tNav}
        />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
          <LocaleSwitcher className="justify-center" />
        </div>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
