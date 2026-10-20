'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PermissionCode } from '@/shared/config/permissions';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  useSidebar,
} from '@/shared/ui/sidebar';
import { ACCESS_CONTROL_NAV_ITEMS } from './nav-access-control-config';
import { NavAccessControlFlyout } from './nav-access-control-flyout';
import { NavAccessControlInlineMenu } from './nav-access-control-inline-menu';

type NavAccessControlGroupProps = {
  pathname: string;
  can: (code: PermissionCode) => boolean;
};

export function NavAccessControlGroup({
  pathname,
  can,
}: NavAccessControlGroupProps) {
  const tNav = useTranslations('nav');
  const { state, isMobile } = useSidebar();
  const visibleItems = ACCESS_CONTROL_NAV_ITEMS.filter((item) =>
    can(item.permission),
  );

  const isChildActive = visibleItems.some((item) => pathname === item.href);
  const [expanded, setExpanded] = useState(false);
  const open = expanded || isChildActive;
  const isIconRail = state === 'collapsed' && !isMobile;

  if (visibleItems.length === 0) {
    return null;
  }

  const label = tNav('accessControl');
  const flyoutItems = visibleItems.map((item) => ({
    href: item.href,
    title: tNav(item.titleKey),
    icon: item.icon,
  }));

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {isIconRail ? (
            <NavAccessControlFlyout
              label={label}
              items={flyoutItems}
              pathname={pathname}
              isChildActive={isChildActive}
            />
          ) : (
            <NavAccessControlInlineMenu
              label={label}
              items={visibleItems}
              pathname={pathname}
              open={open}
              onOpenChange={setExpanded}
              isChildActive={isChildActive}
              titleFor={(item) => tNav(item.titleKey)}
            />
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
