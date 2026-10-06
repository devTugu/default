const ANONYMIZED_EMAIL_PATTERN = /^deleted-\d+@anonymized\.local$/i;

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly passwordHash: string | null,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly roleNames: string[] = [],
    public readonly permissionCodes: string[] = [],
    public readonly mfaEnabled: boolean = false,
    public readonly oauthProvider: string | null = null,
  ) {}

  /** Rejects users already wiped via GDPR anonymize. */
  static assertCanAnonymize(user: User): void {
    if (ANONYMIZED_EMAIL_PATTERN.test(user.email)) {
      throw new Error('USER_ALREADY_ANONYMIZED');
    }
  }
}
