'use client';

import { useTranslations } from 'next-intl';

interface DataTableEmptyProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function DataTableEmpty({
  title,
  description,
  action,
}: DataTableEmptyProps) {
  const t = useTranslations('common');

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-sm font-medium">{title ?? t('noResults')}</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        {description ?? t('noResultsDescription')}
      </p>
      {action}
    </div>
  );
}
