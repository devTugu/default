import type { LocalizedText } from '@/shared/i18n/localized-content';
import { pickLocalized } from '@/shared/lib/pick-localized';
import type { Locale } from '@/shared/i18n/config';
import { env } from '@/shared/config/env';

export interface BrandAssets {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  adminLogoUrl: string | null;
  faviconUrl: string | null;
}

export interface BrandContext {
  siteName: string;
  adminName: string;
  brandName: string;
  siteUrl?: string;
  assets: BrandAssets;
}

const emptyAssets: BrandAssets = {
  logoUrl: null,
  logoDarkUrl: null,
  adminLogoUrl: null,
  faviconUrl: null,
};

export function resolveEnvBrandName(): string {
  return env.BRAND_NAME.trim() || 'Your Site';
}

export function resolveEnvAdminName(): string {
  return env.APP_NAME.trim() || 'Admin Console';
}

export function resolveSiteNameFromCms(
  siteName: LocalizedText | undefined,
  locale: Locale,
): string | null {
  if (!siteName) return null;
  const value = pickLocalized(siteName, locale).trim();
  return value || null;
}

export function resolveBrandContext(input: {
  locale: Locale;
  cmsSiteName?: LocalizedText;
  header?: Partial<BrandAssets>;
}): BrandContext {
  const cmsSiteName = resolveSiteNameFromCms(input.cmsSiteName, input.locale);
  const brandName = cmsSiteName ?? resolveEnvBrandName();

  return {
    siteName: brandName,
    adminName: resolveEnvAdminName(),
    brandName,
    siteUrl: env.SITE_URL,
    assets: {
      logoUrl: input.header?.logoUrl ?? null,
      logoDarkUrl: input.header?.logoDarkUrl ?? null,
      adminLogoUrl: input.header?.adminLogoUrl ?? null,
      faviconUrl: input.header?.faviconUrl ?? null,
    },
  };
}

export function withBrandName(template: string, brandName: string): string {
  return template.replaceAll('{brandName}', brandName);
}

export { emptyAssets };
