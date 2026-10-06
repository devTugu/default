import { AuthorizationDomainService } from './authorization.domain-service';

describe('AuthorizationDomainService', () => {
  const service = new AuthorizationDomainService();

  it('allows super admin any permission', () => {
    expect(
      service.hasAllPermissions([], ['USER_DELETE'], ['SUPER_ADMIN']),
    ).toBe(true);
  });

  it('requires all permissions for normal user', () => {
    expect(
      service.hasAllPermissions(
        ['USER_READ'],
        ['USER_READ', 'USER_DELETE'],
        [],
      ),
    ).toBe(false);
  });
});
