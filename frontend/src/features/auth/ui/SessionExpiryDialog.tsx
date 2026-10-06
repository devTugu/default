'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { refreshClientSession } from '@/shared/lib/bff-refresh';
import { sessionHint } from '@/shared/lib/session-hint';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

const WARNING_BEFORE_MS = 2 * 60 * 1000;

export function SessionExpiryDialog() {
  const t = useTranslations('auth');
  const [open, setOpen] = useState(false);
  const [extending, setExtending] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!sessionHint.hasSession()) {
        setOpen(false);
        return;
      }

      const expiresAt = sessionHint.getExpiresAt();
      if (!expiresAt) return;

      const remaining = expiresAt - Date.now();
      setOpen(remaining > 0 && remaining <= WARNING_BEFORE_MS);
    };

    check();
    const interval = window.setInterval(check, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  const extendSession = async () => {
    setExtending(true);
    try {
      const refreshed = await refreshClientSession({ redirectOnFailure: false });
      if (refreshed) {
        setOpen(false);
      }
    } finally {
      setExtending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('sessionExpiringTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('sessionExpiringDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={extending}>
            {t('dismiss')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={extendSession} disabled={extending}>
            {extending ? t('extending') : t('extendSession')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
