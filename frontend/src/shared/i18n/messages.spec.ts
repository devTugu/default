import { describe, expect, it } from 'vitest';
import en from './messages/en.json';
import mn from './messages/mn.json';
import { getPageTitle, getStepHeadings } from './messages';

function collectKeyPaths(
  value: unknown,
  prefix = '',
): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, nested]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    if (nested !== null && typeof nested === 'object' && !Array.isArray(nested)) {
      return collectKeyPaths(nested, nextPrefix);
    }
    return [nextPrefix];
  });
}

describe('getStepHeadings', () => {
  it('returns localized MFA enrollment heading in Mongolian', () => {
    const headings = getStepHeadings('mn');
    expect(headings['mfa-enroll'].title).toBe('MFA тохируулах');
  });
});

describe('getPageTitle', () => {
  it('returns Mongolian nav title for dashboard route', () => {
    expect(getPageTitle('/dashboard', 'mn')).toBe('Тойм');
  });
});

describe('message catalogs', () => {
  it('keeps en and mn key structures in sync', () => {
    const enKeys = collectKeyPaths(en).sort();
    const mnKeys = collectKeyPaths(mn).sort();
    expect(mnKeys).toEqual(enKeys);
  });
});
