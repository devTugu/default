import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { ITokenBlacklist } from '@application/ports/token-blacklist.port';
import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_ISSUER,
  TOKEN_BLACKLIST,
} from '@shared/constants/tokens';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(TOKEN_BLACKLIST) private readonly blacklist: ITokenBlacklist,
  ) {}

  async execute(
    accessToken: string | undefined,
    refreshTokenRaw: string,
  ): Promise<void> {
    if (accessToken) {
      const decoded = this.tokens.decodeAccess(accessToken);
      if (decoded?.jti && decoded?.exp) {
        await this.blacklist.revoke(decoded.jti, decoded.exp);
      }
    }

    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshTokenRaw)
      .digest('hex');
    const stored = await this.refreshTokens.findByHash(tokenHash);
    if (stored && !stored.revokedAt) {
      await this.refreshTokens.revokeById(stored.id);
    }
  }
}
