export interface StoredRefreshToken {
  id: number;
  userId: number;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
}

export interface IRefreshTokenRepository {
  save(userId: number, tokenHash: string, expiresAt: Date): Promise<void>;
  findByUserAndHash(
    userId: number,
    tokenHash: string,
  ): Promise<StoredRefreshToken | null>;
  findByHash(tokenHash: string): Promise<StoredRefreshToken | null>;
  revokeById(id: number): Promise<void>;
  revokeAllForUser(userId: number): Promise<void>;
}
