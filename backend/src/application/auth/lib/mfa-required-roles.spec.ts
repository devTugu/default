import { parseMfaRequiredRoles, roleRequiresMfa } from './mfa-required-roles';

describe('mfa-required-roles', () => {
  it('returns empty array when explicitly empty string', () => {
    expect(parseMfaRequiredRoles('')).toEqual([]);
  });

  it('defaults to SUPER_ADMIN', () => {
    expect(parseMfaRequiredRoles(undefined)).toEqual(['SUPER_ADMIN']);
  });

  it('parses comma-separated roles', () => {
    expect(parseMfaRequiredRoles('SUPER_ADMIN,ADMIN')).toEqual([
      'SUPER_ADMIN',
      'ADMIN',
    ]);
  });

  it('detects privileged roles', () => {
    expect(roleRequiresMfa(['EDITOR'], ['SUPER_ADMIN'])).toBe(false);
    expect(roleRequiresMfa(['SUPER_ADMIN'], ['SUPER_ADMIN'])).toBe(true);
  });
});
