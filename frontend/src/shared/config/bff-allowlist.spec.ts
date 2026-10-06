import { describe, expect, it } from 'vitest';
import {
  BffPathError,
  isBffPathAllowed,
  normalizeBffPath,
} from './bff-allowlist';

describe('bff-allowlist', () => {
  it('allows known GET routes', () => {
    expect(isBffPathAllowed('/users', 'GET')).toBe(true);
    expect(isBffPathAllowed('/admin/audit-logs', 'GET')).toBe(true);
    expect(isBffPathAllowed('/admin/dashboard/stats', 'GET')).toBe(true);
  });

  it('allows dynamic id segments', () => {
    expect(isBffPathAllowed('/users/42', 'PATCH')).toBe(true);
    expect(isBffPathAllowed('/roles/assign/1/2', 'DELETE')).toBe(true);
  });

  it('rejects unknown paths', () => {
    expect(isBffPathAllowed('/auth/login', 'POST')).toBe(false);
    expect(isBffPathAllowed('/admin/secret', 'GET')).toBe(false);
  });

  it('rejects wrong methods', () => {
    expect(isBffPathAllowed('/users', 'DELETE')).toBe(false);
    expect(isBffPathAllowed('/admin/dashboard/stats', 'POST')).toBe(false);
  });

  it('blocks path traversal segments', () => {
    expect(() => normalizeBffPath(['users', '..', 'admin'])).toThrow(
      BffPathError
    );
    expect(() => normalizeBffPath(['%2e%2e', 'users'])).toThrow(BffPathError);
  });

  it('normalizes valid paths', () => {
    expect(normalizeBffPath(['users', '1'])).toBe('/users/1');
  });
});
