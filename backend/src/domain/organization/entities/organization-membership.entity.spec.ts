import { OrganizationMembership } from './organization-membership.entity';

describe('OrganizationMembership', () => {
  it('accepts owner|admin|member', () => {
    expect(() =>
      OrganizationMembership.create({
        id: 1,
        organizationId: 1,
        userId: 2,
        role: 'owner',
      }),
    ).not.toThrow();
    expect(() => OrganizationMembership.assertValidRole('admin')).not.toThrow();
    expect(() =>
      OrganizationMembership.assertValidRole('member'),
    ).not.toThrow();
  });

  it('rejects invalid roles', () => {
    expect(() => OrganizationMembership.assertValidRole('guest')).toThrow(
      /Invalid organization member role/,
    );
  });
});
