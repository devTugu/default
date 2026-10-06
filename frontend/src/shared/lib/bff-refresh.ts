'use client';

import type { ApiEnvelope } from '@/shared/api/types';
import { redirectToLogin } from '@/shared/lib/clear-client-session';
import { mutatingFetchHeaders } from '@/shared/lib/csrf-client';
import { sessionHint } from '@/shared/lib/session-hint';

interface RefreshClientSessionOptions {
  /** When true, failed refresh clears cookies and redirects to sign-in. */
  redirectOnFailure?: boolean;
}

let refreshPromise: Promise<boolean> | null = null;

async function performRefresh(
  options: RefreshClientSessionOptions,
): Promise<boolean> {
  try {
    const headers = await mutatingFetchHeaders();
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      if (options.redirectOnFailure) {
        await redirectToLogin();
      }
      return false;
    }

    const envelope = (await response.json()) as ApiEnvelope<{
      expiresIn: number;
    }>;
    sessionHint.updateExpiresAt(envelope.data.expiresIn);
    return true;
  } catch {
    if (options.redirectOnFailure) {
      await redirectToLogin();
    }
    return false;
  }
}

export function refreshClientSession(
  options: RefreshClientSessionOptions = {},
): Promise<boolean> {
  const resolvedOptions = {
    redirectOnFailure: options.redirectOnFailure ?? true,
  };

  if (!refreshPromise) {
    refreshPromise = performRefresh(resolvedOptions).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}
