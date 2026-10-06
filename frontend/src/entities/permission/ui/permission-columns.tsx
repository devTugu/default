'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import type { Permission } from '../types/permission';

export function usePermissionColumns() {
  const t = useTranslations('table');

  return useMemo<ColumnDef<Permission, unknown>[]>(
    () => [
      { accessorKey: 'code', header: t('code') },
      {
        accessorKey: 'description',
        header: t('description'),
        cell: ({ row }) => row.original.description ?? '—',
      },
    ],
    [t],
  );
}
