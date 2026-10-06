import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    private readonly config: ConfigService,
  ) {}

  async execute(refreshTokenRaw: string): Promise<TokenPair> {
    let payload: { sub: number; type: string };
    try {
      payload = await this.tokens.verifyRefresh(refreshTokenRaw);
    } catch {
      throw AppErrors.UNAUTHORIZED('Invalid or expired refresh token.');
    }

    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshTokenRaw)
      .digest('hex');
    const stored = await this.refreshTokens.findByUserAndHash(
      payload.sub,
      tokenHash,
    );

    if (!stored) {
      await this.refreshTokens.revokeAllForUser(payload.sub);
      throw AppErrors.UNAUTHORIZED(
        'Refresh token reuse detected. All sessions revoked.',
      );
    }

    if (stored.revokedAt || new Date() > stored.expiresAt) {
      await this.refreshTokens.revokeAllForUser(payload.sub);
      throw AppErrors.UNAUTHORIZED(
        'Refresh token reuse detected. All sessions revoked.',
      );
    }

    const user = await this.users.findById(payload.sub);
    if (!user || !user.isActive) {
      throw AppErrors.UNAUTHORIZED('User is inactive or not found.');
    }

    await this.refreshTokens.revokeById(stored.id);

    const fullUser = await this.users.findByEmailWithRolesAndPermissions(
      user.email,
    );
    if (fullUser) {
      const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
      await this.permissionCache.set(
        fullUser.id,
        {
          roleNames: fullUser.roleNames,
          permissionCodes: fullUser.permissionCodes,
        },
        ttl,
      );
    }

    const issued = await this.tokens.issuePair(user.id, user.email);
    const newHash = crypto
      .createHash('sha256')
      .update(issued.refreshToken)
      .digest('hex');
    await this.refreshTokens.save(user.id, newHash, issued.refreshExpiresAt);

    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
