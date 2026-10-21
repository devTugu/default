'use client';

import type { NavigationSection } from '@default/ui/default-space/blocks/hero-16/index';
import Hero16 from '@default/ui/composed/hero/hero-16';
import { PUBLIC_ROUTES } from '@/shared/config/routes';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import { BrandLogo } from '@/shared/ui/brand-logo';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { cn } from '@/shared/lib/utils';

type HomeHero16Props = {
  getStartedHref: string;
  siteName: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
  navigationData: NavigationSection[];
  getStartedLabel: string;
  bookDemoLabel: string;
  bookDemoHref: string;
  menuLabel: string;
};

const heroNavThemeToggleClassName = cn(
  'size-9 shrink-0 rounded-full border border-border bg-background/90 shadow-xs',
  'hover:bg-muted',
);

export function HomeHero16({
  getStartedHref,
  siteName,
  logoUrl,
  logoDarkUrl,
  navigationData,
  getStartedLabel,
  bookDemoLabel,
  bookDemoHref,
  menuLabel,
}: HomeHero16Props) {
  const hasImageLogo = Boolean(logoUrl ?? logoDarkUrl);

  return (
    <Hero16
      getStartedHref={getStartedHref}
      homeHref={PUBLIC_ROUTES.HOME}
      navigationData={navigationData}
      getStartedLabel={getStartedLabel}
      bookDemoLabel={bookDemoLabel}
      bookDemoHref={bookDemoHref}
      menuLabel={menuLabel}
      logo={
        <BrandLogo
          name={siteName}
          logoUrl={logoUrl}
          logoDarkUrl={logoDarkUrl}
          showName={!hasImageLogo}
          className="text-lg"
        />
      }
      navActions={
        <div className="flex items-center gap-2">
          <ThemeToggle className={heroNavThemeToggleClassName} />
          <LocaleSwitcher variant="flags" />
        </div>
      }
    />
  );
}
