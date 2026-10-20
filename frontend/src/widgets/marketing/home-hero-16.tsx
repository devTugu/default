'use client';

import Hero16 from '@default/ui/composed/hero/hero-16';
import { PUBLIC_ROUTES } from '@/shared/config/routes';
import { BrandLogo } from '@/shared/ui/brand-logo';

type HomeHero16Props = {
  getStartedHref: string;
  siteName: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
};

export function HomeHero16({
  getStartedHref,
  siteName,
  logoUrl,
  logoDarkUrl,
}: HomeHero16Props) {
  const hasImageLogo = Boolean(logoUrl ?? logoDarkUrl);

  return (
    <Hero16
      getStartedHref={getStartedHref}
      homeHref={PUBLIC_ROUTES.HOME}
      logo={
        <BrandLogo
          name={siteName}
          logoUrl={logoUrl}
          logoDarkUrl={logoDarkUrl}
          showName={!hasImageLogo}
          className="text-lg"
        />
      }
    />
  );
}
