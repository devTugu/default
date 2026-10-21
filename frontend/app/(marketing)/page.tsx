import AboutUs04 from '@default/ui/composed/about-us/about-us-04';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPublicSiteSettings } from '@/entities/public-api';
import { resolveBrandContext } from '@/shared/config/brand';
import type { Locale } from '@/shared/i18n/config';
import { ROUTES } from '@/shared/config/routes';
import { isDevServerMode } from '@/shared/config/server-mode';
import { hasServerSession } from '@/shared/lib/server-session';
import {
  buildHomeHeroNavigation,
  homeHeroBookDemoHref,
} from '@/widgets/marketing/build-home-hero-nav';
import { HomeHero16 } from '@/widgets/marketing/home-hero-16';
import { MarketingFooter07 } from '@/widgets/marketing/marketing-footer-07';

export default async function HomePage() {
  const [hasSession, settings, locale, t] = await Promise.all([
    hasServerSession(),
    getPublicSiteSettings(),
    getLocale(),
    getTranslations('marketing.homeHero'),
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
        navigationData={buildHomeHeroNavigation({
          labels: {
            privacy: t('navPrivacy'),
            terms: t('navTerms'),
            docs: t('navDocs'),
          },
          showDocs: isDevServerMode(),
        })}
        getStartedLabel={t('getStarted')}
        bookDemoLabel={t('bookDemo')}
        bookDemoHref={homeHeroBookDemoHref()}
        menuLabel={t('menu')}
      />
      <AboutUs04 />
      <MarketingFooter07 />
    </>
  );
}
