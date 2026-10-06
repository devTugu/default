import type { NextResponse } from 'next/server';
import type { TokenPair } from '@/shared/api/types';

export const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  SESSION: 'session',
} as const;

const REFRESH_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const isProduction = process.env.NODE_ENV === 'production';

const httpOnlyOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
};

export function setAuthCookies(
  response: NextResponse,
  tokens: TokenPair
): NextResponse {
  response.cookies.set(AUTH_COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
    ...httpOnlyOptions,
    maxAge: tokens.expiresIn,
  });

  response.cookies.set(AUTH_COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
    ...httpOnlyOptions,
    maxAge: REFRESH_MAX_AGE_SECONDS,
  });

  response.cookies.set(AUTH_COOKIE_NAMES.SESSION, '1', {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: REFRESH_MAX_AGE_SECONDS,
  });

  return response;
}

export function clearAuthCookies(response: NextResponse): NextResponse {
  for (const name of Object.values(AUTH_COOKIE_NAMES)) {
    response.cookies.set(name, '', {
      httpOnly: name !== AUTH_COOKIE_NAMES.SESSION,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }

  return response;
}
