export type OrganizationMemberRole = 'owner' | 'admin' | 'member';

const VALID_ROLES: ReadonlySet<string> = new Set(['owner', 'admin', 'member']);

/**
 * Membership in an organization.
 * Multi-org UI is out of scope for this template — schema is tenancy-ready only.
 */
export class OrganizationMembership {
  private constructor(
    public readonly id: number,
    public readonly organizationId: number,
    public readonly userId: number,
    public readonly role: OrganizationMemberRole,
  ) {}

  static assertValidRole(role: string): asserts role is OrganizationMemberRole {
    if (!VALID_ROLES.has(role)) {
      throw new Error(
        `Invalid organization member role: ${role}. Expected owner|admin|member.`,
      );
    }
  }

  static create(data: {
    id: number;
    organizationId: number;
    userId: number;
    role: string;
  }): OrganizationMembership {
    OrganizationMembership.assertValidRole(data.role);
    return new OrganizationMembership(
      data.id,
      data.organizationId,
      data.userId,
      data.role,
    );
  }
}
