'use client';

import { CSRF } from '@/shared/lib/csrf';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCsrfHeaderValue(): string | null {
  return readCookie(CSRF.COOKIE);
}

export async function ensureCsrfToken(): Promise<string> {
  const existing = getCsrfHeaderValue();
  if (existing) return existing;

  const response = await fetch('/api/auth/csrf', { credentials: 'include' });
  const envelope = (await response.json()) as { data: { token: string } };
  return envelope.data.token;
}

export function csrfHeaders(): Record<string, string> {
  const token = getCsrfHeaderValue();
  return token ? { [CSRF.HEADER]: token } : {};
}

export async function mutatingFetchHeaders(): Promise<Record<string, string>> {
  const token = await ensureCsrfToken();
  return { [CSRF.HEADER]: token };
}
