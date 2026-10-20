'use client';

import { LogOut } from 'lucide-react';
import { useAuthStore, useLogout } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback } from '@default/ui/primitives/avatar';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@default/ui/primitives/dropdown-menu';
import { getErrorMessage } from '@/shared/api';
import { toast } from 'sonner';

export function NavUserDropdownContent() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const t = useTranslations('auth');
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AD';

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success(t('signedOut'));
      window.location.assign(ROUTES.HOME);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <DropdownMenuContent
      className="min-w-56 rounded-lg"
      align="end"
      sideOffset={8}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.email}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.roles?.join(', ') ?? t('fallbackRoles')}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout} disabled={logout.isPending}>
        <LogOut />
        {t('signOut')}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export function NavUserAvatar({ className }: { className?: string }) {
  const user = useAuthStore((s) => s.user);
  const t = useTranslations('auth');
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'AD';

  return (
    <Avatar className={className}>
      <AvatarFallback className="rounded-full text-xs">{initials}</AvatarFallback>
      <span className="sr-only">{user?.email ?? t('fallbackEmail')}</span>
    </Avatar>
  );
}
