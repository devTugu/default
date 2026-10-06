import { describe, expect, it } from 'vitest';
import {
  emptySiteSettingsFormValues,
  toSiteSettingsFormValues,
} from '@/features/site-settings/ui/site-settings-form.utils';
import type { SiteSettingsOutput } from '@/entities/site-settings';
import { localizedText, localizedStringList } from '@/shared/i18n/localized-content';

const baseSettings: SiteSettingsOutput = {
  id: 1,
  updatedAt: '2026-01-01T00:00:00.000Z',
  hero: {
    title: localizedText('Hello', 'Сайн'),
    subtitle: localizedText('World', 'Дэлхий'),
    description: localizedText('Desc', 'Тайлбар'),
    ctaLabel: localizedText('CTA', 'CTA'),
    ctaUrl: '/',
    imageUrl: null,
  },
  header: {
    logoUrl: null,
    logoDarkUrl: null,
    adminLogoUrl: null,
    faviconUrl: null,
    siteName: localizedText('Site', 'Сайт'),
  },
  footer: {
    copyright: localizedText('2026', '2026'),
    tagline: localizedText('Tag', 'Таг'),
    socialLinks: [],
  },
  seo: {
    title: localizedText('SEO', 'SEO'),
    description: localizedText('Meta', 'Мета'),
    ogImageUrl: null,
    keywords: localizedStringList(['website'], ['вебсайт']),
  },
  contactInfo: {
    email: 'a@b.com',
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
    brief: localizedText('About', 'Тухай'),
    mission: localizedText('Mission', 'Зорилго'),
    vision: localizedText('Vision', 'Алсын хараа'),
    imageUrl: null,
    values: [],
    stats: [],
  },
};

describe('toSiteSettingsFormValues', () => {
  it('normalizes nullable strings to empty values', () => {
    const values = toSiteSettingsFormValues(baseSettings);

    expect(values.hero.imageUrl).toBe('');
    expect(values.about.imageUrl).toBe('');
    expect(values.header.logoUrl).toBe('');
    expect(values.header.logoDarkUrl).toBe('');
    expect(values.header.adminLogoUrl).toBe('');
    expect(values.header.faviconUrl).toBe('');
    expect(values.seo.ogImageUrl).toBe('');
    expect(values.seo.keywords).toEqual(localizedStringList(['website'], ['вебсайт']));
    expect(values.contactInfo.location).toEqual({ en: '', mn: '' });
  });

  it('normalizes malformed social links from API', () => {
    const values = toSiteSettingsFormValues({
      ...baseSettings,
      footer: {
        ...baseSettings.footer,
        socialLinks: [
          { platform: 'github', url: undefined as unknown as string },
          { platform: undefined as unknown as string, url: 'https://example.com' },
        ],
      },
    });

    expect(values.footer.socialLinks).toEqual([
      { platform: 'github', url: '' },
      { platform: '', url: 'https://example.com' },
    ]);
  });

  it('provides stable empty defaults', () => {
    expect(emptySiteSettingsFormValues.hero.title).toEqual({ en: '', mn: '' });
    expect(emptySiteSettingsFormValues.contactInfo.showForm).toBe(true);
  });
});
