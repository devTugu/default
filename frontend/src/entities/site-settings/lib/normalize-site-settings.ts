import type { SiteSettingsOutput } from '@/entities/site-settings';
import { ROUTES } from '@/shared/config/routes';
import {
  emptyLocalizedStringList,
  emptyLocalizedText,
} from '@/shared/i18n/localized-content';

const DEFAULT_SITE_SETTINGS: SiteSettingsOutput = {
  id: 1,
  hero: {
    title: emptyLocalizedText(),
    subtitle: emptyLocalizedText(),
    description: emptyLocalizedText(),
    ctaLabel: emptyLocalizedText(),
    ctaUrl: ROUTES.DASHBOARD,
    secondaryCtaLabel: emptyLocalizedText(),
    secondaryCtaUrl: ROUTES.SITE_SETTINGS,
    imageUrl: null,
  },
  header: {
    logoUrl: null,
    logoDarkUrl: null,
    adminLogoUrl: null,
    faviconUrl: null,
    siteName: emptyLocalizedText(),
  },
  footer: {
    copyright: emptyLocalizedText(),
    tagline: emptyLocalizedText(),
    socialLinks: [],
  },
  seo: {
    title: emptyLocalizedText(),
    description: emptyLocalizedText(),
    ogImageUrl: null,
    keywords: emptyLocalizedStringList(),
  },
  contactInfo: {
    email: '',
    phone: null,
    location: null,
    address: null,
    workHours: null,
    showForm: true,
  },
  theme: {
    brandColor: null,
  },
  about: {
    brief: emptyLocalizedText(),
    mission: emptyLocalizedText(),
    vision: emptyLocalizedText(),
    imageUrl: null,
    values: [],
    stats: [],
  },
  updatedAt: new Date(0).toISOString(),
};

export function getEmptySiteSettings(): SiteSettingsOutput {
  return { ...DEFAULT_SITE_SETTINGS };
}

export function normalizeSiteSettings(
  raw: SiteSettingsOutput | null | undefined,
): SiteSettingsOutput | null {
  if (!raw) {
    return null;
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...raw,
    hero: {
      ...DEFAULT_SITE_SETTINGS.hero,
      ...raw.hero,
      secondaryCtaLabel:
        raw.hero?.secondaryCtaLabel ?? DEFAULT_SITE_SETTINGS.hero.secondaryCtaLabel,
      secondaryCtaUrl:
        raw.hero?.secondaryCtaUrl ?? DEFAULT_SITE_SETTINGS.hero.secondaryCtaUrl,
    },
    theme: {
      ...DEFAULT_SITE_SETTINGS.theme,
      ...raw.theme,
    },
    about: {
      ...DEFAULT_SITE_SETTINGS.about,
      ...raw.about,
      imageUrl: raw.about?.imageUrl ?? null,
      values: raw.about?.values ?? [],
      stats: raw.about?.stats ?? [],
    },
    contactInfo: {
      ...DEFAULT_SITE_SETTINGS.contactInfo,
      ...raw.contactInfo,
    },
  };
}
