import { describe, expect, it } from 'vitest';
import { pickLocalized, pickLocalizedList } from './pick-localized';

describe('pickLocalized', () => {
  it('returns requested locale text', () => {
    expect(pickLocalized({ en: 'Hello', mn: 'Сайн' }, 'mn')).toBe('Сайн');
  });

  it('returns empty string for undefined text', () => {
    expect(pickLocalized(undefined, 'en')).toBe('');
  });

  it('falls back to en when locale empty', () => {
    expect(pickLocalized({ en: 'Hello', mn: '' }, 'mn')).toBe('Hello');
  });
});

describe('pickLocalizedList', () => {
  it('returns localized list for locale', () => {
    expect(pickLocalizedList({ en: ['a'], mn: ['б'] }, 'mn')).toEqual(['б']);
  });

  it('falls back to en list', () => {
    expect(pickLocalizedList({ en: ['a'], mn: [] }, 'mn')).toEqual(['a']);
  });
});
