import { Inject, Injectable } from '@nestjs/common';
import { deviceLabelFromUserAgent } from '@default/utils/user-agent';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { AppErrors } from '@application/exceptions/application.exception';
import { REFRESH_TOKEN_REPOSITORY } from '@shared/constants/tokens';
import { RecordRefreshTokenService } from '../services/record-refresh-token.service';

export interface AuthSessionOutput {
  id: number;
  deviceLabel: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  lastSeenAt: string;
  expiresAt: string;
  current: boolean;
}

export interface AuthSessionsListOutput {
  items: AuthSessionOutput[];
}

@Injectable()
export class ListAuthSessionsUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    private readonly recordRefresh: RecordRefreshTokenService,
  ) {}

  async execute(
    userId: number,
    currentRefreshTokenRaw?: string,
  ): Promise<AuthSessionsListOutput> {
    const currentHash = currentRefreshTokenRaw
      ? this.recordRefresh.hashRefreshToken(currentRefreshTokenRaw)
      : null;
    const rows = await this.refreshTokens.listActiveForUser(userId);

    return {
      items: rows.map((row) => ({
        id: row.id,
        deviceLabel: deviceLabelFromUserAgent(row.userAgent),
        ipAddress: row.ipAddress ?? null,
        userAgent: row.userAgent ?? null,
        createdAt: row.createdAt.toISOString(),
        lastSeenAt: (row.lastSeenAt ?? row.createdAt).toISOString(),
        expiresAt: row.expiresAt.toISOString(),
        current: currentHash !== null && row.tokenHash === currentHash,
      })),
    };
  }
}

@Injectable()
export class RevokeAuthSessionUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
  ) {}

  async execute(userId: number, sessionId: number): Promise<void> {
    const revoked = await this.refreshTokens.revokeByIdForUser(
      userId,
      sessionId,
    );
    if (!revoked) {
      throw AppErrors.NOT_FOUND('Session not found.');
    }
  }
}

@Injectable()
export class RevokeOtherAuthSessionsUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    private readonly recordRefresh: RecordRefreshTokenService,
  ) {}

  async execute(userId: number, currentRefreshTokenRaw: string): Promise<void> {
    const exceptHash = this.recordRefresh.hashRefreshToken(
      currentRefreshTokenRaw,
    );
    await this.refreshTokens.revokeAllExceptHash(userId, exceptHash);
  }
}
