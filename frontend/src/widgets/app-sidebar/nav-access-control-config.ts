import { KeyRound, Shield, Users, type LucideIcon } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import {
  PERMISSION_CODES,
  type PermissionCode,
} from '@/shared/config/permissions';
import type { AppMessages } from '@/shared/i18n/messages';

type NavTitleKey = keyof AppMessages['nav'];

export type AccessNavItem = {
  titleKey: NavTitleKey;
  href: string;
  icon: LucideIcon;
  permission: PermissionCode;
};

export const ACCESS_CONTROL_NAV_ITEMS: AccessNavItem[] = [
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
];
