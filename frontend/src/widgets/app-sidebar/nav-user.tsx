'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@default/ui/primitives/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import {
  NavUserAvatar,
  NavUserDropdownContent,
} from './nav-user-dropdown';

export function NavUser() {
  const user = useAuthStore((s) => s.user);
  const t = useTranslations('auth');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <NavUserAvatar className="size-8 rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.email ?? t('fallbackEmail')}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.roles?.join(', ') ?? t('fallbackRoles')}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <NavUserDropdownContent />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
