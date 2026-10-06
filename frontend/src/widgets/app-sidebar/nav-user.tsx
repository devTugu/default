'use client';

import { useRouter } from 'next/navigation';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useAuthStore, useLogout } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/sidebar';
import { getErrorMessage } from '@/shared/api';
import { toast } from 'sonner';

export function NavUser() {
  const { isMobile } = useSidebar();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const router = useRouter();
  const t = useTranslations('auth');

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AD';

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push(ROUTES.LOGIN);
      toast.success(t('signedOut'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
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
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={logout.isPending}>
              <LogOut />
              {t('signOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
