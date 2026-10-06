import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/shared/lib/auth-cookies';
import type { ApiEnvelope } from '@/shared/api/types';
import type { LoginResult, TokenPair } from '@/shared/api/types';

export function isTokenPair(data: LoginResult): data is TokenPair {
  return typeof data === 'object' && data !== null && 'accessToken' in data;
}

export function isMfaRequired(
  data: LoginResult,
): data is { requiresMfa: true; mfaToken: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'requiresMfa' in data &&
    data.requiresMfa === true
  );
}

export function isMfaEnrollmentRequired(
  data: LoginResult,
): data is { requiresMfaEnrollment: true; enrollmentToken: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'requiresMfaEnrollment' in data &&
    data.requiresMfaEnrollment === true
  );
}

export function buildAuthSuccessResponse(
  envelope: ApiEnvelope<LoginResult>,
): NextResponse {
  const data = envelope.data;

  if (isMfaRequired(data)) {
    return NextResponse.json({
      success: true,
      data: { requiresMfa: true, mfaToken: data.mfaToken },
    });
  }

  if (isMfaEnrollmentRequired(data)) {
    return NextResponse.json({
      success: true,
      data: {
        requiresMfaEnrollment: true,
        enrollmentToken: data.enrollmentToken,
      },
    });
  }

  if (!isTokenPair(data)) {
    throw new Error('Unexpected login response shape');
  }

  const response = NextResponse.json({
    success: true,
    data: { expiresIn: data.expiresIn },
  });

  return setAuthCookies(response, data);
}

export function buildTokenPairResponse(pair: TokenPair): NextResponse {
  const response = NextResponse.json({
    success: true,
    data: { expiresIn: pair.expiresIn },
  });

  return setAuthCookies(response, pair);
}
