import {
  parseMfaRequiredRoles,
  resolveMfaRequiredRolesFromPolicy,
  roleRequiresMfa,
} from './mfa-required-roles';

describe('mfa-required-roles', () => {
  it('returns empty array when explicitly empty string', () => {
    expect(parseMfaRequiredRoles('')).toEqual([]);
  });

  it('returns empty when unset', () => {
    expect(parseMfaRequiredRoles(undefined)).toEqual([]);
  });

  it('resolveMfaRequiredRolesFromPolicy respects platform toggle', () => {
    expect(resolveMfaRequiredRolesFromPolicy(false, 'SUPER_ADMIN')).toEqual([]);
    expect(resolveMfaRequiredRolesFromPolicy(true, '')).toEqual([
      'SUPER_ADMIN',
    ]);
    expect(resolveMfaRequiredRolesFromPolicy(true, 'ADMIN')).toEqual(['ADMIN']);
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
