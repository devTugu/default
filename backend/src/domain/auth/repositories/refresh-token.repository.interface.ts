export interface RefreshTokenSessionMeta {
  userAgent?: string | null;
  ipAddress?: string | null;
}

export interface StoredRefreshToken {
  id: number;
  userId: number;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  lastSeenAt?: Date | null;
  createdAt: Date;
}

export interface IRefreshTokenRepository {
  save(
    userId: number,
    tokenHash: string,
    expiresAt: Date,
    meta?: RefreshTokenSessionMeta,
  ): Promise<void>;
  findByUserAndHash(
    userId: number,
    tokenHash: string,
  ): Promise<StoredRefreshToken | null>;
  findByHash(tokenHash: string): Promise<StoredRefreshToken | null>;
  listActiveForUser(userId: number): Promise<StoredRefreshToken[]>;
  revokeById(id: number): Promise<void>;
  revokeByIdForUser(userId: number, id: number): Promise<boolean>;
  revokeAllForUser(userId: number): Promise<void>;
  revokeAllExceptHash(userId: number, exceptHash: string): Promise<void>;
}
