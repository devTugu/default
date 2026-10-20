import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IMfaVerifier } from '@application/ports/identity.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { MFA_VERIFIER, USER_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class DisableMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number, code: string): Promise<void> {
    const encrypted = await this.users.getMfaSecretEncrypted(userId);
    if (!encrypted) {
      throw AppErrors.BAD_REQUEST('MFA is not enabled.');
    }

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(userId, {
      mfaEnabled: false,
      mfaSecretEncrypted: null,
    });
  }
}
