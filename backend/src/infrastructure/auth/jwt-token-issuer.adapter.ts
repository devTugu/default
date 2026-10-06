import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import {
  ITokenIssuer,
  IssuedTokens,
  RefreshTokenClaims,
} from '@application/ports/token-issuer.port';

interface DecodedJwtExp {
  exp: number;
}

function decodeJwtExp(
  jwtService: JwtService,
  token: string,
): DecodedJwtExp | null {
  const decoded: unknown = jwtService.decode(token);
  if (
    decoded &&
    typeof decoded === 'object' &&
    'exp' in decoded &&
    typeof (decoded as DecodedJwtExp).exp === 'number'
  ) {
    return decoded as DecodedJwtExp;
  }
  return null;
}

function isRefreshTokenClaims(value: unknown): value is RefreshTokenClaims {
  return (
    !!value &&
    typeof value === 'object' &&
    'type' in value &&
    'sub' in value &&
    (value as RefreshTokenClaims).type === 'refresh'
  );
}

@Injectable()
export class JwtTokenIssuerAdapter implements ITokenIssuer {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  issuePair(userId: number, email: string): Promise<IssuedTokens> {
    const accessSecret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const accessExpiresIn = this.parseExpiresIn(
      this.config.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
    );
    const refreshExpiresIn = this.parseExpiresIn(
      this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    );

    const jti = uuidv4();
    const accessToken = this.jwtService.sign(
      { sub: userId, email, type: 'access', jti },
      { secret: accessSecret, expiresIn: accessExpiresIn },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId, type: 'refresh' },
      { secret: refreshSecret, expiresIn: refreshExpiresIn },
    );

    const refreshDecoded = decodeJwtExp(this.jwtService, refreshToken);
    const accessDecoded = decodeJwtExp(this.jwtService, accessToken);

    if (!refreshDecoded || !accessDecoded) {
      return Promise.reject(new Error('FAILED_TO_DECODE_ISSUED_TOKENS'));
    }

    return Promise.resolve({
      accessToken,
      refreshToken,
      accessExpiresIn: accessDecoded.exp - Math.floor(Date.now() / 1000),
      refreshExpiresAt: new Date(refreshDecoded.exp * 1000),
      jti,
    });
  }

  verifyRefresh(token: string): Promise<RefreshTokenClaims> {
    const secret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const verified: unknown = this.jwtService.verify(token, { secret });
    if (!isRefreshTokenClaims(verified)) {
      return Promise.reject(new Error('INVALID_REFRESH_TOKEN'));
    }
    return Promise.resolve(verified);
  }

  issueMfaPendingToken(userId: number): Promise<string> {
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const token = this.jwtService.sign(
      { sub: userId, type: 'mfa_pending' },
      { secret, expiresIn: 300 },
    );
    return Promise.resolve(token);
  }

  verifyMfaPending(
    token: string,
  ): Promise<{ sub: number; type: 'mfa_pending' }> {
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const verified: unknown = this.jwtService.verify(token, { secret });
    if (
      !verified ||
      typeof verified !== 'object' ||
      !('type' in verified) ||
      (verified as { type: string }).type !== 'mfa_pending' ||
      !('sub' in verified)
    ) {
      return Promise.reject(new Error('INVALID_MFA_TOKEN'));
    }
    return Promise.resolve(verified as { sub: number; type: 'mfa_pending' });
  }

  issueMfaEnrollmentPendingToken(userId: number): Promise<string> {
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const token = this.jwtService.sign(
      { sub: userId, type: 'mfa_enrollment_pending' },
      { secret, expiresIn: 900 },
    );
    return Promise.resolve(token);
  }

  verifyMfaEnrollmentPending(
    token: string,
  ): Promise<{ sub: number; type: 'mfa_enrollment_pending' }> {
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const verified: unknown = this.jwtService.verify(token, { secret });
    if (
      !verified ||
      typeof verified !== 'object' ||
      !('type' in verified) ||
      (verified as { type: string }).type !== 'mfa_enrollment_pending' ||
      !('sub' in verified)
    ) {
      return Promise.reject(new Error('INVALID_ENROLLMENT_TOKEN'));
    }
    return Promise.resolve(
      verified as { sub: number; type: 'mfa_enrollment_pending' },
    );
  }

  decodeAccess(token: string): { jti?: string; exp?: number } | null {
    try {
      const decoded: unknown = this.jwtService.decode(token);
      if (!decoded || typeof decoded !== 'object') return null;
      return decoded;
    } catch {
      return null;
    }
  }

  private parseExpiresIn(value: string): number {
    const match = value.trim().match(/^(\d+)(s|m|h|d)?$/i);
    if (!match) return 900;
    const num = parseInt(match[1], 10);
    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };
    return num * (multipliers[(match[2] ?? 's').toLowerCase()] ?? 1);
  }
}
