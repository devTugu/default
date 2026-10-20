'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES, type PermissionCode } from '@/shared/config/permissions';
import { ROUTES } from '@/shared/config/routes';
import type { AppMessages } from '@/shared/i18n/messages';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@default/ui/primitives/command';

type NavLabelKey = keyof AppMessages['nav'];

type CommandNavItem = {
  href: string;
  labelKey: NavLabelKey;
  icon: LucideIcon;
  permission?: PermissionCode;
};

const SYSTEM_NAV_ITEMS: CommandNavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    labelKey: 'overview',
    icon: LayoutDashboard,
    permission: PERMISSION_CODES.DASHBOARD_READ,
  },
  {
    href: ROUTES.SITE_SETTINGS_AUDIT,
    labelKey: 'auditLogs',
    icon: ClipboardList,
    permission: PERMISSION_CODES.AUDIT_READ,
  },
];

const ACCESS_CONTROL_NAV_ITEMS: CommandNavItem[] = [
  {
    href: ROUTES.USERS,
    labelKey: 'users',
    icon: Users,
    permission: PERMISSION_CODES.USER_READ,
  },
  {
    href: ROUTES.ROLES,
    labelKey: 'roles',
    icon: Shield,
    permission: PERMISSION_CODES.ROLE_READ,
  },
  {
    href: ROUTES.PERMISSIONS,
    labelKey: 'permissions',
    icon: KeyRound,
    permission: PERMISSION_CODES.PERMISSION_READ,
  },
];

const CONTENT_NAV_ITEMS: CommandNavItem[] = [
  {
    href: ROUTES.SITE_SETTINGS,
    labelKey: 'siteSettings',
    icon: Settings,
    permission: PERMISSION_CODES.SITE_SETTING_READ,
  },
];

function filterNavItems(
  items: CommandNavItem[],
  can: (code: PermissionCode) => boolean,
) {
  return items.filter((item) => !item.permission || can(item.permission));
}

type AdminCommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AdminCommandMenu({ open, onOpenChange }: AdminCommandMenuProps) {
  const router = useRouter();
  const { can } = useAuthPermissions();
  const t = useTranslations('dashboard.command');
  const tNav = useTranslations('nav');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onOpenChange, open]);

  const systemItems = filterNavItems(SYSTEM_NAV_ITEMS, can);
  const accessItems = filterNavItems(ACCESS_CONTROL_NAV_ITEMS, can);
  const contentItems = filterNavItems(CONTENT_NAV_ITEMS, can);

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const renderItems = (items: CommandNavItem[]) =>
    items.map((item) => (
      <CommandItem
        key={item.href}
        value={tNav(item.labelKey)}
        onSelect={() => navigate(item.href)}
      >
        <item.icon className="text-muted-foreground size-4" />
        {tNav(item.labelKey)}
      </CommandItem>
    ));

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      description={t('description')}
    >
      <CommandInput placeholder={t('placeholder')} />
      <CommandList>
        <CommandEmpty>{t('empty')}</CommandEmpty>
        {systemItems.length > 0 ? (
          <CommandGroup heading={tNav('system')}>
            {renderItems(systemItems)}
          </CommandGroup>
        ) : null}
        {accessItems.length > 0 ? (
          <CommandGroup heading={tNav('accessControl')}>
            {renderItems(accessItems)}
          </CommandGroup>
        ) : null}
        {contentItems.length > 0 ? (
          <CommandGroup heading={tNav('content')}>
            {renderItems(contentItems)}
          </CommandGroup>
        ) : null}
        <CommandSeparator />
        <CommandGroup heading={t('groupActions')}>
          <CommandItem value={t('home')} onSelect={() => navigate(ROUTES.HOME)}>
            {t('home')}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
