'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PUBLIC_ROUTES, ROUTES } from '@/shared/config/routes';
import { BrandLogo } from '@/shared/ui/brand-logo';
import { cn } from '@/shared/lib/utils';
import { MarketingLayoutGrid } from '@/widgets/marketing/ui';
import {
  SiteHeaderDesktopNav,
  SiteHeaderMobileMenu,
  SiteHeaderMobileToggle,
} from './site-header-nav';

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
              className={cn(
                isTransparent && !logoDarkUrl && 'brightness-0 invert',
              )}
            />
          </Link>

          <SiteHeaderDesktopNav
            authHref={authHref}
            authLabel={authLabel}
            isTransparent={isTransparent}
          />
          <SiteHeaderMobileToggle
            mobileOpen={mobileOpen}
            isTransparent={isTransparent}
            onToggle={() => setMobileOpen((value) => !value)}
          />
        </div>
      </MarketingLayoutGrid>

      {mobileOpen ? (
        <SiteHeaderMobileMenu
          authHref={authHref}
          authLabel={authLabel}
          onNavigate={() => setMobileOpen(false)}
        />
      ) : null}
    </header>
  );
}
