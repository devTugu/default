import AboutUs04 from '@default/ui/composed/about-us/about-us-04';
import { getLocale } from 'next-intl/server';
import { getPublicSiteSettings } from '@/entities/public-api';
import { resolveBrandContext } from '@/shared/config/brand';
import type { Locale } from '@/shared/i18n/config';
import { ROUTES } from '@/shared/config/routes';
import { hasServerSession } from '@/shared/lib/server-session';
import { HomeHero16 } from '@/widgets/marketing/home-hero-16';
import { MarketingFooter07 } from '@/widgets/marketing/marketing-footer-07';

export default async function HomePage() {
  const [hasSession, settings, locale] = await Promise.all([
    hasServerSession(),
    getPublicSiteSettings(),
    getLocale(),
  ]);
  const getStartedHref = hasSession ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const brand = resolveBrandContext({
    locale: locale as Locale,
    cmsSiteName: settings?.header.siteName,
    header: settings?.header,
  });

  return (
    <>
      <HomeHero16
        getStartedHref={getStartedHref}
        siteName={brand.siteName}
        logoUrl={brand.assets.logoUrl}
        logoDarkUrl={brand.assets.logoDarkUrl}
      />
      <AboutUs04 />
      <MarketingFooter07 />
    </>
  );
}
