'use client';

import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useAuditLogs, type AuditLogOutput } from '@/entities/audit-log';
import { useTableSearchParams } from '@/shared/hooks/use-table-search-params';
import {
  DataTable,
  DataTableToolbar,
  DataTableEmpty,
  DataTableQueryState,
} from '@/shared/ui/data-table';

export function AuditLogsTable() {
  const t = useTranslations('entities.auditLogs');
  const tTable = useTranslations('table');
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams();

  const { data, isLoading, isError, error, refetch } = useAuditLogs(queryParams);

  const columns = useMemo<ColumnDef<AuditLogOutput, unknown>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: tTable('time'),
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
      },
      { accessorKey: 'action', header: tTable('action') },
      { accessorKey: 'resource', header: tTable('resource') },
      { accessorKey: 'resourceId', header: tTable('resourceId') },
      { accessorKey: 'userId', header: tTable('userId') },
      { accessorKey: 'ipAddress', header: tTable('ip') },
    ],
    [tTable],
  );

  return (
    <div className="space-y-4">
      <DataTableToolbar
        initialSearch={search}
        onSearchChange={onSearchChange}
        placeholder={t('searchPlaceholder')}
      />
      <DataTableQueryState isError={isError} error={error} refetch={refetch}>
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          pageCount={data?.totalPages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          emptyContent={<DataTableEmpty title={t('emptyTitle')} />}
        />
      </DataTableQueryState>
    </div>
  );
}
