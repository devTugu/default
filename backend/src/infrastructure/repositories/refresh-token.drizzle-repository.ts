import { Inject, Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import {
  IRefreshTokenRepository,
  StoredRefreshToken,
} from '@domain/auth/repositories/refresh-token.repository.interface';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { refreshTokens } from '../database/drizzle/schema';

@Injectable()
export class RefreshTokenDrizzleRepository implements IRefreshTokenRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {}

  async save(
    userId: number,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      expiresAt,
    });
  }

  async findByUserAndHash(
    userId: number,
    tokenHash: string,
  ): Promise<StoredRefreshToken | null> {
    const entity = await this.db.query.refreshTokens.findFirst({
      where: and(
        eq(refreshTokens.userId, userId),
        eq(refreshTokens.tokenHash, tokenHash),
      ),
    });
    return entity ? this.toStored(entity) : null;
  }

  async findByHash(tokenHash: string): Promise<StoredRefreshToken | null> {
    const entity = await this.db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.tokenHash, tokenHash),
    });
    return entity ? this.toStored(entity) : null;
  }

  async revokeById(id: number): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.id, id));
  }

  async revokeAllForUser(userId: number): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(
        and(eq(refreshTokens.userId, userId), isNull(refreshTokens.revokedAt)),
      );
  }

  private toStored(
    entity: typeof refreshTokens.$inferSelect,
  ): StoredRefreshToken {
    return {
      id: entity.id,
      userId: entity.userId,
      tokenHash: entity.tokenHash,
      expiresAt: entity.expiresAt,
      revokedAt: entity.revokedAt ?? null,
    };
  }
}
