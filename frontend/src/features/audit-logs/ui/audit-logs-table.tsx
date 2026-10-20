'use client';

import { useMemo } from 'react';
import type { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import { useAuditLogs, type AuditLogOutput } from '@/entities/audit-log';
import { useTableSearchParams } from '@/shared/hooks/use-table-search-params';
import {
  DataTableEmpty,
  DataTableQueryState,
  InvoiceManagementDataTable,
} from '@/shared/ui/data-table';

export function AuditLogsTable() {
  const t = useTranslations('entities.auditLogs');
  const tTable = useTranslations('table');
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams({ defaultPageSize: 10 });

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
    <DataTableQueryState isError={isError} error={error} refetch={refetch}>
      <InvoiceManagementDataTable
        columns={columns}
        data={data?.items ?? []}
        totalCount={data?.total ?? 0}
        pageCount={data?.totalPages ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
        search={search}
        onSearchChange={onSearchChange}
        searchPlaceholder={t('searchPlaceholder')}
        emptyContent={<DataTableEmpty title={t('emptyTitle')} />}
      />
    </DataTableQueryState>
  );
}
