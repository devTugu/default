import { describe, expect, it } from 'vitest';
import {
  emptySiteSettingsFormValues,
  toSiteSettingsFormValues,
} from '@/features/site-settings/ui/site-settings-form.utils';
import type { SiteSettingsOutput } from '@/entities/site-settings';

const baseSettings: SiteSettingsOutput = {
  id: 1,
  updatedAt: '2026-01-01T00:00:00.000Z',
  hero: {} as SiteSettingsOutput['hero'],
  header: {
    logoUrl: null,
    logoDarkUrl: null,
    adminLogoUrl: null,
    faviconUrl: null,
    siteName: { en: 'Acme', mn: 'Акме' },
  },
  footer: {} as SiteSettingsOutput['footer'],
  seo: {} as SiteSettingsOutput['seo'],
  contactInfo: {} as SiteSettingsOutput['contactInfo'],
  theme: { brandColor: '#112233' },
  about: {} as SiteSettingsOutput['about'],
  security: { enforcePrivilegedMfa: false },
};

describe('toSiteSettingsFormValues', () => {
  it('maps site name and brand color only', () => {
    const values = toSiteSettingsFormValues(baseSettings);
    expect(values.header.siteName).toEqual({ en: 'Acme', mn: 'Акме' });
    expect(values.theme.brandColor).toBe('#112233');
  });

  it('provides empty defaults', () => {
    expect(emptySiteSettingsFormValues.header.siteName).toEqual({ en: '', mn: '' });
    expect(emptySiteSettingsFormValues.theme.brandColor).toBe('');
  });
});
