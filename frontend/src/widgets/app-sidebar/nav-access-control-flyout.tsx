'use client';

import Link from 'next/link';
import { KeyRound, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@default/ui/primitives/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import {
  sidebarNavActiveClass,
  sidebarNavSubActiveClass,
} from './nav-active-styles';

type FlyoutItem = {
  href: string;
  title: string;
  icon: LucideIcon;
};

type NavAccessControlFlyoutProps = {
  label: string;
  items: FlyoutItem[];
  pathname: string;
  isChildActive: boolean;
};

export function NavAccessControlFlyout({
  label,
  items,
  pathname,
  isChildActive,
}: NavAccessControlFlyoutProps) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            isActive={isChildActive}
            className={cn(isChildActive && sidebarNavActiveClass)}
          >
            <KeyRound />
            <span>{label}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={8}
          className="w-56 rounded-xl p-0 shadow-lg"
        >
          <div className="border-b px-3 py-2.5 text-sm font-semibold">{label}</div>
          <div className="flex flex-col gap-0.5 p-1.5">
            {items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm',
                      active
                        ? sidebarNavSubActiveClass
                        : 'text-foreground',
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className={cn(active && 'text-[0.9375rem]')}>
                      {item.title}
                    </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
