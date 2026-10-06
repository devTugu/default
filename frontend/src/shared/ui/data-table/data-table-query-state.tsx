'use client';

import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/ui/button';

interface DataTableQueryStateProps {
  isError: boolean;
  error: unknown;
  refetch: () => void;
  children: React.ReactNode;
}

export function DataTableQueryState({
  isError,
  error,
  refetch,
  children,
}: DataTableQueryStateProps) {
  const t = useTranslations('common');

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3"
      >
        <p className="text-sm text-destructive">{getErrorMessage(error)}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => refetch()}
        >
          <RefreshCw className="mr-2 size-4" />
          {t('retry')}
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
