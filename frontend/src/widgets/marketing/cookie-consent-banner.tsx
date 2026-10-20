'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@default/ui/primitives/button';

const CONSENT_STORAGE_KEY = 'cookie-consent-v1';

const consentListeners = new Set<() => void>();

function subscribeConsent(onStoreChange: () => void) {
  consentListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) {
      onStoreChange();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    consentListeners.delete(onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

function readConsentAccepted(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function getConsentSnapshot(): boolean {
  return readConsentAccepted();
}

function getConsentServerSnapshot(): boolean {
  return true;
}

function persistConsentAccepted() {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
  } catch {
    // ignore
  }
  consentListeners.forEach((listener) => listener());
}

export function CookieConsentBanner() {
  const t = useTranslations('marketing.cookieConsent');
  const accepted = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  if (accepted) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('ariaLabel')}
      className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 fixed inset-x-0 bottom-0 z-50 border-t p-4 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t('message')}{' '}
          <Link
            href={ROUTES.PRIVACY}
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {t('learnMore')}
          </Link>
        </p>
        <Button
          type="button"
          size="sm"
          className="shrink-0"
          onClick={persistConsentAccepted}
        >
          {t('accept')}
        </Button>
      </div>
    </div>
  );
}
