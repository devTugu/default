import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { assertCsrf } from '@/shared/lib/bff-csrf';
import { CSRF } from '@/shared/lib/csrf';

describe('assertCsrf', () => {
  it('returns 403 when header missing', () => {
    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      headers: { cookie: `${CSRF.COOKIE}=abc123` },
    });

    const response = assertCsrf(request);
    expect(response?.status).toBe(403);
  });

  it('returns null when token matches', () => {
    const token = 'b'.repeat(64);
    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      headers: {
        cookie: `${CSRF.COOKIE}=${token}`,
        [CSRF.HEADER]: token,
      },
    });

    expect(assertCsrf(request)).toBeNull();
  });
});
