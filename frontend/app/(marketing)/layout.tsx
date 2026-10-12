import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getPublicSiteSettings } from '@/entities/public-api';
import { resolveBrandContext } from '@/shared/config/brand';
import {
  buildBrandHeroPalette,
  toMarketingMeshCssVars,
} from '@/widgets/marketing/lib/marketing/brand-hero-palette';
import { normalizeHexColor } from '@/shared/lib/normalize-hex-color';
import type { Locale } from '@/shared/i18n/config';
import { hasServerSession } from '@/shared/lib/server-session';
import { SiteFooter, MarketingSiteHeader } from '@/widgets/marketing';
import { buildMarketingMetadata } from './build-marketing-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const locale = (await getLocale()) as Locale;
  return buildMarketingMetadata({ settings, locale });
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;
  const [settings, hasSession] = await Promise.all([
    getPublicSiteSettings(),
    hasServerSession(),
  ]);

  const brand = resolveBrandContext({
    locale,
    cmsSiteName: settings?.header.siteName,
    header: settings?.header,
  });
  const footer = settings?.footer ?? {
    copyright: { en: '', mn: '' },
    tagline: { en: '', mn: '' },
    socialLinks: [],
  };
  const brandColor = normalizeHexColor(settings?.theme?.brandColor);
  const heroPalette = buildBrandHeroPalette(brandColor);

  return (
    <div
      data-marketing-theme-root
      className="relative flex min-h-svh flex-col"
      style={
        toMarketingMeshCssVars(heroPalette, brandColor) as React.CSSProperties
      }
    >
      <MarketingSiteHeader
        siteName={brand.siteName}
        logoUrl={brand.assets.logoUrl}
        logoDarkUrl={brand.assets.logoDarkUrl}
        hasSession={hasSession}
      />
      <main className="relative z-[2] flex-1">{children}</main>
      <SiteFooter footer={footer} siteName={brand.siteName} />
    </div>
  );
}
