export interface OAuthUserInfo {
  provider: string;
  subject: string;
  email: string;
  name?: string;
}

export interface IOAuthIdentityProvider {
  isEnabled(): boolean;
  getAuthorizationUrl(state: string): Promise<string>;
  exchangeCode(code: string): Promise<OAuthUserInfo>;
}

export interface IMfaVerifier {
  generateSecret(email: string): { secret: string; otpauthUrl: string };
  encryptSecret(secret: string): string;
  decryptSecret(encrypted: string): string;
  verifyToken(secret: string, token: string): boolean;
}
