'use client';

import { useEffect, useRef } from 'react';
import { refreshClientSession } from '@/shared/lib/bff-refresh';
import { sessionHint } from '@/shared/lib/session-hint';

const REFRESH_BUFFER_MS = 60_000;

export function useTokenRefreshScheduler() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bootstrapAttemptedRef = useRef(false);

  useEffect(() => {
    const schedule = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (!sessionHint.hasSession()) return;

      const expiresAt = sessionHint.getExpiresAt();
      if (!expiresAt) {
        if (!bootstrapAttemptedRef.current) {
          bootstrapAttemptedRef.current = true;
          void refreshClientSession({ redirectOnFailure: false }).then(
            (refreshed) => {
              if (refreshed) schedule();
            },
          );
        }
        return;
      }

      const delay = Math.max(expiresAt - Date.now() - REFRESH_BUFFER_MS, 0);

      timerRef.current = setTimeout(async () => {
        const refreshed = await refreshClientSession({
          redirectOnFailure: true,
        });
        if (refreshed) schedule();
      }, delay);
    };

    schedule();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
