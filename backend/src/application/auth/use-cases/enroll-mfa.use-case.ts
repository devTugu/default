import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IMfaVerifier } from '@application/ports/identity.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { AppErrors } from '@application/exceptions/application.exception';
import {
  MFA_VERIFIER,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from '@shared/constants/tokens';

@Injectable()
export class EnrollMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number): Promise<{ otpauthUrl: string }> {
    const user = await this.users.findById(userId);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    const { secret, otpauthUrl } = this.mfa.generateSecret(user.email);
    await this.users.update(userId, {
      mfaSecretEncrypted: this.mfa.encryptSecret(secret),
      mfaEnabled: false,
    });

    return { otpauthUrl };
  }
}

@Injectable()
export class EnrollMfaWithEnrollmentTokenUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
  ) {}

  async execute(enrollmentToken: string): Promise<{ otpauthUrl: string }> {
    const claims =
      await this.tokens.verifyMfaEnrollmentPending(enrollmentToken);
    const user = await this.users.findById(claims.sub);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    const { secret, otpauthUrl } = this.mfa.generateSecret(user.email);
    await this.users.update(claims.sub, {
      mfaSecretEncrypted: this.mfa.encryptSecret(secret),
      mfaEnabled: false,
    });

    return { otpauthUrl };
  }
}
