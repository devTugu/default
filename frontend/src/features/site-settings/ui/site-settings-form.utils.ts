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

export function toSiteSettingsFormValues(
  data: SiteSettingsOutput,
): SiteSettingsFormValues {
  return {
    hero: {
      ...data.hero,
      title: {
        en: data.hero.title?.en ?? '',
        mn: data.hero.title?.mn ?? '',
      },
      subtitle: {
        en: data.hero.subtitle?.en ?? '',
        mn: data.hero.subtitle?.mn ?? '',
      },
      description: {
        en: data.hero.description?.en ?? '',
        mn: data.hero.description?.mn ?? '',
      },
      ctaLabel: {
        en: data.hero.ctaLabel?.en ?? '',
        mn: data.hero.ctaLabel?.mn ?? '',
      },
      ctaUrl: data.hero.ctaUrl ?? '',
      secondaryCtaLabel: {
        en: data.hero.secondaryCtaLabel?.en ?? '',
        mn: data.hero.secondaryCtaLabel?.mn ?? '',
      },
      secondaryCtaUrl: data.hero.secondaryCtaUrl ?? '',
      imageUrl: data.hero.imageUrl ?? '',
    },
    header: {
      ...data.header,
      logoUrl: data.header.logoUrl ?? '',
      logoDarkUrl: data.header.logoDarkUrl ?? '',
      adminLogoUrl: data.header.adminLogoUrl ?? '',
      faviconUrl: data.header.faviconUrl ?? '',
      siteName: {
        en: data.header.siteName?.en ?? '',
        mn: data.header.siteName?.mn ?? '',
      },
    },
    footer: {
      ...data.footer,
      copyright: {
        en: data.footer.copyright?.en ?? '',
        mn: data.footer.copyright?.mn ?? '',
      },
      tagline: {
        en: data.footer.tagline?.en ?? '',
        mn: data.footer.tagline?.mn ?? '',
      },
      socialLinks: (data.footer.socialLinks ?? []).map((link) => ({
        platform: link.platform ?? '',
        url: link.url ?? '',
      })),
    },
    seo: {
      ...data.seo,
      title: {
        en: data.seo.title?.en ?? '',
        mn: data.seo.title?.mn ?? '',
      },
      description: {
        en: data.seo.description?.en ?? '',
        mn: data.seo.description?.mn ?? '',
      },
      ogImageUrl: data.seo.ogImageUrl ?? '',
      keywords: data.seo.keywords ?? emptyLocalizedStringList(),
    },
    contactInfo: {
      ...data.contactInfo,
      email: data.contactInfo.email ?? '',
      phone: data.contactInfo.phone ?? '',
      location: data.contactInfo.location
        ? {
            en: data.contactInfo.location.en ?? '',
            mn: data.contactInfo.location.mn ?? '',
          }
        : emptyLocalizedText(),
      address: data.contactInfo.address
        ? {
            en: data.contactInfo.address.en ?? '',
            mn: data.contactInfo.address.mn ?? '',
          }
        : emptyLocalizedText(),
      workHours: data.contactInfo.workHours
        ? {
            en: data.contactInfo.workHours.en ?? '',
            mn: data.contactInfo.workHours.mn ?? '',
          }
        : emptyLocalizedText(),
      showForm: data.contactInfo.showForm ?? true,
    },
    theme: {
      brandColor: data.theme?.brandColor ?? '',
    },
    about: {
      brief: {
        en: data.about?.brief?.en ?? '',
        mn: data.about?.brief?.mn ?? '',
      },
      mission: {
        en: data.about?.mission?.en ?? '',
        mn: data.about?.mission?.mn ?? '',
      },
      vision: {
        en: data.about?.vision?.en ?? '',
        mn: data.about?.vision?.mn ?? '',
      },
      imageUrl: data.about?.imageUrl ?? '',
      values: data.about?.values ?? [],
      stats: data.about?.stats ?? [],
    },
  };
}
