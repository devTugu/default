import { describe, expect, it } from 'vitest';
import {
  resolveBrandContext,
  resolveSiteNameFromCms,
  withBrandName,
} from './brand';
import { emptyLocalizedText } from '@/shared/i18n/localized-content';

describe('brand', () => {
  it('prefers CMS site name over env fallback', () => {
    const brand = resolveBrandContext({
      locale: 'en',
      cmsSiteName: { en: 'CMS Brand', mn: 'CMS MN' },
    });
    expect(brand.siteName).toBe('CMS Brand');
  });

  it('falls back when CMS site name is empty', () => {
    const brand = resolveBrandContext({
      locale: 'en',
      cmsSiteName: emptyLocalizedText(),
    });
    expect(brand.siteName).toBeTruthy();
  });

  it('resolves localized site name for locale', () => {
    expect(
      resolveSiteNameFromCms({ en: 'English', mn: 'Mongolian' }, 'mn'),
    ).toBe('Mongolian');
  });

  it('interpolates brand name in templates', () => {
    expect(withBrandName('Hello {brandName}', 'Acme')).toBe('Hello Acme');
  });
});
