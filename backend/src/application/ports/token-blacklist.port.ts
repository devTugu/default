export interface ITokenBlacklist {
  revoke(jti: string, expiresAtUnix: number): Promise<void>;
  isRevoked(jti: string): Promise<boolean>;
}
