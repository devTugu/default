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
import { MarketingFooter07 } from '@/widgets/marketing/marketing-footer-07';
import { MarketingLayoutRoot } from '@/widgets/marketing/marketing-layout-root';
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
  const brandColor = normalizeHexColor(settings?.theme?.brandColor);
  const heroPalette = buildBrandHeroPalette(brandColor);

  const meshStyle = toMarketingMeshCssVars(
    heroPalette,
    brandColor,
  ) as React.CSSProperties;

  return (
    <MarketingLayoutRoot
      siteName={brand.siteName}
      logoUrl={brand.assets.logoUrl}
      logoDarkUrl={brand.assets.logoDarkUrl}
      hasSession={hasSession}
      meshStyle={meshStyle}
      footer={<MarketingFooter07 />}
    >
      {children}
    </MarketingLayoutRoot>
  );
}
