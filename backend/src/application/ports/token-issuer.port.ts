export interface AccessTokenClaims {
  sub: number;
  email: string;
  jti: string;
  type: 'access';
}

export interface RefreshTokenClaims {
  sub: number;
  type: 'refresh';
}

export interface MfaPendingClaims {
  sub: number;
  type: 'mfa_pending';
}

export interface MfaEnrollmentPendingClaims {
  sub: number;
  type: 'mfa_enrollment_pending';
}

export interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresAt: Date;
  jti: string;
}

export interface ITokenIssuer {
  issuePair(userId: number, email: string): Promise<IssuedTokens>;
  issueMfaPendingToken(userId: number): Promise<string>;
  verifyMfaPending(token: string): Promise<MfaPendingClaims>;
  issueMfaEnrollmentPendingToken(userId: number): Promise<string>;
  verifyMfaEnrollmentPending(
    token: string,
  ): Promise<MfaEnrollmentPendingClaims>;
  verifyRefresh(token: string): Promise<RefreshTokenClaims>;
  decodeAccess(token: string): { jti?: string; exp?: number } | null;
}
