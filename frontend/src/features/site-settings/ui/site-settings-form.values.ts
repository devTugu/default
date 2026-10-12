import type { SiteSettingsOutput } from '@/entities/site-settings';
import {
  emptyLocalizedStringList,
  emptyLocalizedText,
} from '@/shared/i18n/localized-content';

export type SiteSettingsFormValues = Omit<
  SiteSettingsOutput,
  'id' | 'updatedAt'
>;

export const emptySiteSettingsFormValues: SiteSettingsFormValues = {
  hero: {
    title: emptyLocalizedText(),
    subtitle: emptyLocalizedText(),
    description: emptyLocalizedText(),
    ctaLabel: emptyLocalizedText(),
    ctaUrl: '',
    secondaryCtaLabel: emptyLocalizedText(),
    secondaryCtaUrl: '',
    imageUrl: '',
  },
  header: {
    logoUrl: '',
    logoDarkUrl: '',
    adminLogoUrl: '',
    faviconUrl: '',
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
    ogImageUrl: '',
    keywords: emptyLocalizedStringList(),
  },
  contactInfo: {
    email: '',
    phone: '',
    location: emptyLocalizedText(),
    address: emptyLocalizedText(),
    workHours: emptyLocalizedText(),
    showForm: true,
  },
  theme: {
    brandColor: '',
  },
  about: {
    brief: emptyLocalizedText(),
    mission: emptyLocalizedText(),
    vision: emptyLocalizedText(),
    imageUrl: '',
    values: [],
    stats: [],
  },
};
