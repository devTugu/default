import {
  coerceLocalizedStringList,
  coerceLocalizedText,
  pickLocalizedText,
} from './localized-content.mapper';

describe('localized-content.mapper', () => {
  describe('coerceLocalizedText', () => {
    it('converts legacy string to en/mn pair', () => {
      expect(coerceLocalizedText('Hello')).toEqual({
        en: 'Hello',
        mn: 'Hello',
      });
    });

    it('passes through localized object', () => {
      expect(coerceLocalizedText({ en: 'Hi', mn: 'Сайн' })).toEqual({
        en: 'Hi',
        mn: 'Сайн',
      });
    });

    it('returns empty strings for invalid input', () => {
      expect(coerceLocalizedText(null)).toEqual({ en: '', mn: '' });
    });
  });

  describe('coerceLocalizedStringList', () => {
    it('converts legacy string array to en/mn lists', () => {
      expect(coerceLocalizedStringList(['a', 'b'])).toEqual({
        en: ['a', 'b'],
        mn: ['a', 'b'],
      });
    });

    it('passes through localized lists', () => {
      expect(coerceLocalizedStringList({ en: ['a'], mn: ['б'] })).toEqual({
        en: ['a'],
        mn: ['б'],
      });
    });
  });

  describe('pickLocalizedText', () => {
    it('prefers requested locale', () => {
      expect(pickLocalizedText({ en: 'Hi', mn: 'Сайн' }, 'mn')).toBe('Сайн');
    });

    it('falls back to en when locale empty', () => {
      expect(pickLocalizedText({ en: 'Hi', mn: '' }, 'mn')).toBe('Hi');
    });
  });
});
