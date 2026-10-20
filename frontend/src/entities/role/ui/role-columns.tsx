'use client';

import { useMemo } from 'react';
import type { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import type { Role } from '../types/role';

export function useRoleColumns() {
  const t = useTranslations('table');

  return useMemo<ColumnDef<Role, unknown>[]>(
    () => [
      { accessorKey: 'name', header: t('name') },
      {
        accessorKey: 'description',
        header: t('description'),
        cell: ({ row }) => row.original.description ?? '—',
      },
      {
        id: 'permissions',
        header: t('permissions'),
        cell: ({ row }) => (
          <span className="text-muted-foreground text-sm">
            {t('assignedCount', { count: row.original.permissions.length })}
          </span>
        ),
      },
    ],
    [t],
  );
}
