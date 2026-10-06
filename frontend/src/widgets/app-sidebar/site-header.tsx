'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getPageTitle } from '@/shared/i18n/messages';
import type { Locale } from '@/shared/i18n/config';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import { Separator } from '@/shared/ui/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const title = getPageTitle(pathname, locale);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <LocaleSwitcher className="hidden sm:flex" />
        <ThemeToggle />
      </div>
    </header>
  );
}
