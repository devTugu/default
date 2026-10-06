'use client';

import { ROUTES } from '@/shared/config/routes';
import { mutatingFetchHeaders } from '@/shared/lib/csrf-client';
import { sessionHint } from '@/shared/lib/session-hint';

export async function clearClientSession(): Promise<void> {
  sessionHint.clear();

  try {
    const headers = await mutatingFetchHeaders().catch(() => ({}));
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers,
    });
  } catch {
    // Stale or invalid cookies — local hint is already cleared.
  }
}

export function redirectToLogin(): void {
  if (typeof window === 'undefined') return;

  void clearClientSession().finally(() => {
    if (!window.location.pathname.startsWith(ROUTES.LOGIN)) {
      window.location.href = ROUTES.LOGIN;
    }
  });
}
