import type { Metadata } from 'next';
import type { SiteSettingsOutput } from '@/entities/site-settings';
import { resolveBrandContext } from '@/shared/config/brand';
import type { Locale } from '@/shared/i18n/config';
import { pickLocalized, pickLocalizedList } from '@/shared/lib/pick-localized';

const emptyLocalized = { en: '', mn: '' };

function resolveSeoFields(
  settings: SiteSettingsOutput | null | undefined,
  locale: Locale,
  siteName: string,
) {
  const seo = settings?.seo;
  const title =
    pickLocalized(seo?.title ?? emptyLocalized, locale) || siteName;
  const description =
    pickLocalized(seo?.description ?? emptyLocalized, locale) ||
    pickLocalized(settings?.hero.description ?? emptyLocalized, locale);

  return {
    title,
    description,
    keywords: seo?.keywords
      ? pickLocalizedList(seo.keywords, locale)
      : undefined,
    ogImageUrl: seo?.ogImageUrl,
  };
}

export function buildMarketingMetadata(params: {
  settings: SiteSettingsOutput | null | undefined;
  locale: Locale;
}): Metadata {
  const { settings, locale } = params;
  const brand = resolveBrandContext({
    locale,
    cmsSiteName: settings?.header.siteName,
    header: settings?.header,
  });
  const seoFields = resolveSeoFields(settings, locale, brand.siteName);

  return {
    metadataBase: brand.siteUrl ? new URL(brand.siteUrl) : undefined,
    title: seoFields.title,
    description: seoFields.description,
    keywords: seoFields.keywords,
    icons: brand.assets.faviconUrl
      ? { icon: [{ url: brand.assets.faviconUrl }] }
      : undefined,
    openGraph: {
      title: seoFields.title,
      description: seoFields.description || undefined,
      ...(seoFields.ogImageUrl
        ? { images: [{ url: seoFields.ogImageUrl }] }
        : {}),
    },
  };
}
