import { NextRequest, NextResponse } from 'next/server';
import { CSRF, validateCsrfToken } from '@/shared/lib/csrf';

export function csrfForbiddenResponse(): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'CSRF_VALIDATION_FAILED',
        message: 'Invalid or missing CSRF token.',
      },
    },
    { status: 403 },
  );
}

export function assertCsrf(request: NextRequest): NextResponse | null {
  const cookieToken = request.cookies.get(CSRF.COOKIE)?.value;
  const headerToken = request.headers.get(CSRF.HEADER);

  if (!validateCsrfToken(cookieToken, headerToken)) {
    return csrfForbiddenResponse();
  }

  return null;
}
