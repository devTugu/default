import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { REFRESH_TOKEN_REPOSITORY } from '@shared/constants/tokens';
import type { ClientRequestMeta } from '../dto/client-request-meta';

@Injectable()
export class RecordRefreshTokenService {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
  ) {}

  async record(
    userId: number,
    refreshTokenRaw: string,
    expiresAt: Date,
    meta?: ClientRequestMeta,
  ): Promise<void> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshTokenRaw)
      .digest('hex');
    await this.refreshTokens.save(userId, tokenHash, expiresAt, meta);
  }

  hashRefreshToken(refreshTokenRaw: string): string {
    return crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
  }
}
