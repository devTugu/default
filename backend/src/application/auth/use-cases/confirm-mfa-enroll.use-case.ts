import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IMfaVerifier } from '@application/ports/identity.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import {
  MFA_VERIFIER,
  PERMISSION_CACHE,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from '@shared/constants/tokens';
import type { ClientRequestMeta } from '../dto/client-request-meta';
import { RecordRefreshTokenService } from '../services/record-refresh-token.service';

@Injectable()
export class ConfirmMfaEnrollUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number, code: string): Promise<void> {
    const encrypted = await this.users.getMfaSecretEncrypted(userId);
    if (!encrypted) throw AppErrors.BAD_REQUEST('Start MFA enrollment first.');

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(userId, { mfaEnabled: true });
  }
}

@Injectable()
export class ConfirmMfaEnrollWithEnrollmentTokenUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    private readonly config: ConfigService,
    private readonly recordRefresh: RecordRefreshTokenService,
  ) {}

  async execute(
    enrollmentToken: string,
    code: string,
    meta?: ClientRequestMeta,
  ): Promise<TokenPair> {
    const claims =
      await this.tokens.verifyMfaEnrollmentPending(enrollmentToken);
    const encrypted = await this.users.getMfaSecretEncrypted(claims.sub);
    if (!encrypted) {
      throw AppErrors.BAD_REQUEST('Start MFA enrollment first.');
    }

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(claims.sub, { mfaEnabled: true });

    const user = await this.users.findByEmailWithRolesAndPermissions(
      (await this.users.findById(claims.sub))!.email,
    );
    if (!user) throw AppErrors.UNAUTHORIZED('User not found.');

    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.permissionCache.set(
      user.id,
      { roleNames: user.roleNames, permissionCodes: user.permissionCodes },
      ttl,
    );

    const issued = await this.tokens.issuePair(user.id, user.email);
    await this.recordRefresh.record(
      user.id,
      issued.refreshToken,
      issued.refreshExpiresAt,
      meta,
    );
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
