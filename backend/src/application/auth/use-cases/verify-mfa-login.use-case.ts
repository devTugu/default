import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { IMfaVerifier } from '@application/ports/identity.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import {
  USER_REPOSITORY,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
  MFA_VERIFIER,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';
import type { ClientRequestMeta } from '../dto/client-request-meta';
import { RecordRefreshTokenService } from '../services/record-refresh-token.service';

@Injectable()
export class VerifyMfaLoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    private readonly recordRefresh: RecordRefreshTokenService,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    private readonly config: ConfigService,
  ) {}

  async execute(
    mfaToken: string,
    code: string,
    meta?: ClientRequestMeta,
  ): Promise<TokenPair> {
    const claims = await this.tokens.verifyMfaPending(mfaToken);
    const userRecord = await this.users.findById(claims.sub);
    if (!userRecord) throw AppErrors.UNAUTHORIZED('Invalid MFA session.');

    const user = await this.users.findByEmailWithRolesAndPermissions(
      userRecord.email,
    );
    if (!user) throw AppErrors.UNAUTHORIZED('Invalid MFA session.');

    const encrypted = await this.users.getMfaSecretEncrypted(user.id);
    if (!encrypted) throw AppErrors.UNAUTHORIZED('MFA not configured.');

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

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
