'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{t('pageTitle')}</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || t('pageDescription')}
        </p>
      </div>
      <Button type="button" variant="outline" onClick={reset}>
        {t('tryAgain')}
      </Button>
    </div>
  );
}
