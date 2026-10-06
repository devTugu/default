import { describe, expect, it } from 'vitest';
import { validateCsrfToken } from '@/shared/lib/csrf';

describe('validateCsrfToken', () => {
  it('returns true for matching tokens', () => {
    const token = 'a'.repeat(64);
    expect(validateCsrfToken(token, token)).toBe(true);
  });

  it('returns false when header missing', () => {
    expect(validateCsrfToken('abc', null)).toBe(false);
  });

  it('returns false for length mismatch', () => {
    expect(validateCsrfToken('abc', 'abcd')).toBe(false);
  });
});
