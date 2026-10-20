import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gt, isNull, ne } from 'drizzle-orm';
import {
  IRefreshTokenRepository,
  RefreshTokenSessionMeta,
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
    meta?: RefreshTokenSessionMeta,
  ): Promise<void> {
    const now = new Date();
    await this.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      expiresAt,
      userAgent: meta?.userAgent ?? null,
      ipAddress: meta?.ipAddress ?? null,
      lastSeenAt: now,
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

  async listActiveForUser(userId: number): Promise<StoredRefreshToken[]> {
    const now = new Date();
    const rows = await this.db.query.refreshTokens.findMany({
      where: and(
        eq(refreshTokens.userId, userId),
        isNull(refreshTokens.revokedAt),
        gt(refreshTokens.expiresAt, now),
      ),
      orderBy: desc(refreshTokens.lastSeenAt),
    });
    return rows.map((row) => this.toStored(row));
  }

  async revokeById(id: number): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.id, id));
  }

  async revokeByIdForUser(userId: number, id: number): Promise<boolean> {
    const row = await this.db.query.refreshTokens.findFirst({
      where: and(eq(refreshTokens.id, id), eq(refreshTokens.userId, userId)),
    });
    if (!row || row.revokedAt) {
      return false;
    }
    await this.revokeById(id);
    return true;
  }

  async revokeAllForUser(userId: number): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(
        and(eq(refreshTokens.userId, userId), isNull(refreshTokens.revokedAt)),
      );
  }

  async revokeAllExceptHash(userId: number, exceptHash: string): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(
        and(
          eq(refreshTokens.userId, userId),
          isNull(refreshTokens.revokedAt),
          ne(refreshTokens.tokenHash, exceptHash),
        ),
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
      userAgent: entity.userAgent ?? null,
      ipAddress: entity.ipAddress ?? null,
      lastSeenAt: entity.lastSeenAt ?? entity.createdAt,
      createdAt: entity.createdAt,
    };
  }
}
