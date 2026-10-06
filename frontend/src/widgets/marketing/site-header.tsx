'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PUBLIC_ROUTES, ROUTES } from '@/shared/config/routes';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import { Button } from '@/shared/ui/button';
import { MarketingLayoutGrid } from '@/widgets/marketing/ui';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { BrandLogo } from '@/shared/ui/brand-logo';
import { cn } from '@/shared/lib/utils';

interface SiteHeaderProps {
  siteName: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
  hasSession: boolean;
  hasHero?: boolean;
}

export function SiteHeader({
  siteName,
  logoUrl,
  logoDarkUrl,
  hasSession,
  hasHero = false,
}: SiteHeaderProps) {
  const t = useTranslations('marketing.nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const authHref = hasSession ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const authLabel = hasSession ? t('dashboard') : t('signIn');
  const isTransparent = !isScrolled && !!hasHero;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        isTransparent
          ? 'border-transparent bg-transparent'
          : 'border-border/60 bg-background/95 border-b shadow-sm backdrop-blur-md',
      )}
    >
      <MarketingLayoutGrid>
        <div className="col-span-1 flex h-16 items-center gap-4 lg:col-span-4">
          <Link
            href={PUBLIC_ROUTES.HOME}
            className="shrink-0 text-lg font-semibold tracking-tight"
          >
            <BrandLogo
              name={siteName}
              logoUrl={logoUrl}
              logoDarkUrl={logoDarkUrl}
              showName={!logoUrl && !logoDarkUrl}
              className={cn(isTransparent && !logoDarkUrl && 'brightness-0 invert')}
            />
          </Link>

          <div className="hidden items-center gap-2 lg:ml-auto lg:flex">
            <ThemeToggle
              className={cn(
                isTransparent && 'text-white hover:bg-white/10 hover:text-white',
              )}
            />
            <Link
              href={authHref}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/90 hover:bg-white/10 hover:text-white'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              {authLabel}
            </Link>
            <LocaleSwitcher
              variant="flags"
              className={cn(isTransparent && 'text-white hover:bg-white/10')}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn('ml-auto lg:hidden', isTransparent && 'text-white hover:bg-white/10')}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </MarketingLayoutGrid>

      {mobileOpen ? (
        <div className="border-border/60 bg-background/95 border-t px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href={authHref}
              className="text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {authLabel}
            </Link>
            <LocaleSwitcher variant="flags" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
