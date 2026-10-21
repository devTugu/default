import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import {
  resolveBffClientIp,
  withBffClientHeaders,
} from '@/shared/lib/bff-client-meta';

function requestWithHeaders(
  url: string,
  headers: Record<string, string>,
): NextRequest {
  return new NextRequest(url, { headers });
}

describe('bff-client-meta', () => {
  describe('resolveBffClientIp', () => {
    it('prefers the first public IP in X-Forwarded-For', () => {
      const request = requestWithHeaders('http://localhost/api/auth/login', {
        'x-forwarded-for': '203.0.113.10, 10.0.0.1',
      });

      expect(resolveBffClientIp(request)).toBe('203.0.113.10');
    });

    it('falls back to loopback when no forwarded headers exist', () => {
      const request = requestWithHeaders('http://localhost/api/auth/login', {});

      expect(resolveBffClientIp(request)).toBe('127.0.0.1');
    });
  });

  describe('withBffClientHeaders', () => {
    it('sets X-Forwarded-For and preserves authorization', () => {
      const request = requestWithHeaders('http://localhost/api/auth/me', {
        'x-forwarded-for': '198.51.100.4',
        'user-agent': 'vitest',
      });

      const headers = withBffClientHeaders(request, {
        Authorization: 'Bearer token',
      });

      expect(headers.get('X-Forwarded-For')).toBe('198.51.100.4');
      expect(headers.get('Authorization')).toBe('Bearer token');
      expect(headers.get('User-Agent')).toBe('vitest');
      expect(headers.get('Accept')).toBe('application/json');
    });
  });
});
