'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { BellRing, Globe } from 'lucide-react';
import NotificationDropdown from '@default/ui/default-space/blocks/shared/notification-dropdown';
import LanguageDropdown from '@default/ui/default-space/blocks/shared/dropdown-language';
import ProfileDropdown from '@default/ui/default-space/blocks/shared/dropdown-profile';
import { Button } from '@default/ui/primitives/button';
import { useAuthPermissions, useAuthStore, useLogout } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { ROUTES } from '@/shared/config/routes';
import { type Locale, locales } from '@/shared/i18n/config';
import { setLocaleCookie } from '@/shared/lib/locale-cookie';
import { getErrorMessage } from '@/shared/api';
import { toast } from 'sonner';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { NavUserAvatar } from '@/widgets/app-sidebar/nav-user-dropdown';

const ADMIN_LANGUAGES = [
  {
    value: 'en',
    label: 'English',
    icon: '/icons/flag-us.svg',
  },
  {
    value: 'mn',
    label: 'Монгол',
  },
] as const;

export function AdminTopbar03Actions() {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations('dashboard.header');
  const tAuth = useTranslations('auth');
  const { can } = useAuthPermissions();
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  const handleLocaleChange = (next: string) => {
    if (!locales.includes(next as Locale) || next === locale) {
      return;
    }
    setLocaleCookie(next as Locale);
    router.refresh();
  };

  const handleSignOut = async () => {
    try {
      await logout.mutateAsync();
      toast.success(tAuth('signedOut'));
      window.location.assign(ROUTES.HOME);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const viewAllNotifications = () => {
    if (can(PERMISSION_CODES.AUDIT_READ)) {
      router.push(ROUTES.SITE_SETTINGS_AUDIT);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <NotificationDropdown
        defaultOpen={false}
        align="end"
        title={t('notifications')}
        badgeLabel={t('notificationsBadge')}
        inboxLabel={t('notificationsInbox')}
        generalLabel={t('notificationsGeneral')}
        settingsLabel={t('notificationsSettings')}
        declineLabel={t('notificationsDecline')}
        acceptLabel={t('notificationsAccept')}
        viewAllLabel={t('viewAllNotifications')}
        onViewAll={viewAllNotifications}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative size-9 hover:bg-accent"
            aria-label={t('notifications')}
          >
            <BellRing className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 ring-2 ring-card" />
          </Button>
        }
      />
      <ThemeToggle className="size-9 hover:bg-accent" />
      <LanguageDropdown
        align="end"
        languages={[...ADMIN_LANGUAGES]}
        value={locale}
        onValueChange={handleLocaleChange}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hover:bg-accent/80! cursor-pointer rounded-full! focus-visible:shadow-none! focus-visible:ring-0!"
            suppressHydrationWarning
            aria-label={t('language')}
          >
            <Globe size={16} />
          </Button>
        }
      />
      <ProfileDropdown
        align="end"
        user={
          user
            ? {
                email: user.email,
                displayName: user.email.split('@')[0],
                fallbackInitials: user.email.slice(0, 2).toUpperCase(),
              }
            : undefined
        }
        onSignOut={handleSignOut}
        signOutPending={logout.isPending}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 cursor-pointer rounded-full"
            suppressHydrationWarning
            aria-label={t('account')}
          >
            <NavUserAvatar className="size-7 rounded-full" />
          </Button>
        }
      />
    </div>
  );
}
