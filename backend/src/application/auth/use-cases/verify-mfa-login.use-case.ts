import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { IMfaVerifier } from '@application/ports/identity.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
  MFA_VERIFIER,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerifyMfaLoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    private readonly config: ConfigService,
  ) {}

  async execute(mfaToken: string, code: string): Promise<TokenPair> {
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
    const tokenHash = crypto
      .createHash('sha256')
      .update(issued.refreshToken)
      .digest('hex');
    await this.refreshTokens.save(user.id, tokenHash, issued.refreshExpiresAt);
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
