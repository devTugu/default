'use client';

import Link from 'next/link';
import { ChevronRight, KeyRound } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@default/ui/primitives/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar';
import {
  sidebarNavActiveClass,
  sidebarNavSubActiveClass,
} from './nav-active-styles';
import type { AccessNavItem } from './nav-access-control-config';

type NavAccessControlInlineMenuProps = {
  label: string;
  items: AccessNavItem[];
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isChildActive: boolean;
  titleFor: (item: AccessNavItem) => string;
};

export function NavAccessControlInlineMenu({
  label,
  items,
  pathname,
  open,
  onOpenChange,
  isChildActive,
  titleFor,
}: NavAccessControlInlineMenuProps) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            isActive={isChildActive}
            className={cn('group/trigger', isChildActive && sidebarNavActiveClass)}
          >
            <KeyRound />
            <span>{label}</span>
            <ChevronRight className="ml-auto transition-transform group-aria-expanded/trigger:rotate-90 group-data-[collapsible=icon]:hidden" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item) => {
              const title = titleFor(item);
              const active = pathname === item.href;
              return (
                <SidebarMenuSubItem key={item.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={active}
                    className={cn(active && sidebarNavSubActiveClass)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span className={cn(active && 'text-[0.9375rem]')}>
                        {title}
                      </span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
