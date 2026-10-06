'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/badge';
import { useFormatDate } from '@/shared/i18n/use-format-date';
import type { UserOutput } from '../types/user';

export function useUserColumns() {
  const t = useTranslations('table');
  const tStatus = useTranslations('status');
  const formatDate = useFormatDate();

  return useMemo<ColumnDef<UserOutput, unknown>[]>(
    () => [
      {
        accessorKey: 'email',
        header: t('email'),
      },
      {
        accessorKey: 'roles',
        header: t('roles'),
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.roles.map((role) => (
              <Badge key={role} variant="secondary">
                {role}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'isActive',
        header: t('status'),
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'default' : 'outline'}>
            {row.original.isActive ? tStatus('active') : tStatus('inactive')}
          </Badge>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: t('created'),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
    ],
    [t, tStatus, formatDate],
  );
}
