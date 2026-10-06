import { NextResponse } from 'next/server';
import { CSRF, generateCsrfToken } from '@/shared/lib/csrf';

const isProduction = process.env.NODE_ENV === 'production';

export async function GET() {
  const token = generateCsrfToken();

  const response = NextResponse.json({
    success: true,
    data: { token },
  });

  response.cookies.set(CSRF.COOKIE, token, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}
