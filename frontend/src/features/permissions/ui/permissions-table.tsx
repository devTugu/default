'use client';

import { useMemo, useState } from 'react';
import type { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import { usePermissionList, type Permission } from '@/entities/permission';
import { usePermissionColumns } from '@/entities/permission/ui/permission-columns';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { useTableSearchParams } from '@/shared/hooks/use-table-search-params';
import { AdminTableActions } from '@/shared/ui/admin-table-actions';
import {
  DataTableEmpty,
  DataTableQueryState,
  InvoiceManagementDataTable,
} from '@/shared/ui/data-table';
import { Button } from '@default/ui/primitives/button';
import {
  PermissionManageSheet,
  type PermissionSheetState,
} from './permission-manage-sheet';
import { PermissionDeleteDialog } from './permission-delete-dialog';

export function PermissionsTable() {
  const t = useTranslations('entities.permissions');
  const tTable = useTranslations('table');
  const { can } = useAuthPermissions();
  const permissionColumns = usePermissionColumns();
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams({ defaultPageSize: 10 });
  const { data, isLoading, isError, error, refetch } =
    usePermissionList(queryParams);
  const [sheetState, setSheetState] = useState<PermissionSheetState | null>(
    null,
  );
  const [deleteItem, setDeleteItem] = useState<Permission | null>(null);

  const columns = useMemo<ColumnDef<Permission, unknown>[]>(
    () => [
      ...permissionColumns
        .filter(
          (column) =>
            !('accessorKey' in column && column.accessorKey === 'description'),
        )
        .map((column) => {
        if ('accessorKey' in column && column.accessorKey === 'code') {
          return {
            ...column,
            cell: ({ row }: { row: { original: Permission } }) => (
              <div className="min-w-0">
                <p className="font-mono text-sm font-medium">
                  {row.original.code}
                </p>
                {row.original.description ? (
                  <p className="text-muted-foreground truncate text-xs">
                    {row.original.description}
                  </p>
                ) : null}
              </div>
            ),
          };
        }
        return column;
      }),
      {
        id: 'actions',
        header: () => tTable('actions'),
        cell: ({ row }) => (
          <AdminTableActions
            name={row.original.code}
            updatePermission={PERMISSION_CODES.PERMISSION_UPDATE}
            deletePermission={PERMISSION_CODES.PERMISSION_DELETE}
            can={can}
            variant="icons"
            onEdit={() =>
              setSheetState({ mode: 'edit', permission: row.original })
            }
            onDelete={() => setDeleteItem(row.original)}
          />
        ),
      },
    ],
    [permissionColumns, tTable, can],
  );

  const canCreate = can(PERMISSION_CODES.PERMISSION_CREATE);

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
        toolbarActions={
          canCreate ? (
            <Button
              size="sm"
              onClick={() => setSheetState({ mode: 'create' })}
            >
              {t('addPermission')}
            </Button>
          ) : null
        }
        emptyContent={
          <DataTableEmpty
            title={t('emptyTitle')}
            action={
              canCreate ? (
                <Button
                  size="sm"
                  onClick={() => setSheetState({ mode: 'create' })}
                >
                  {t('addPermission')}
                </Button>
              ) : undefined
            }
          />
        }
      />
      <PermissionManageSheet
        state={sheetState}
        onOpenChange={(open) => !open && setSheetState(null)}
      />
      <PermissionDeleteDialog
        permission={deleteItem}
        open={Boolean(deleteItem)}
        onOpenChange={(open) => !open && setDeleteItem(null)}
      />
    </DataTableQueryState>
  );
}
