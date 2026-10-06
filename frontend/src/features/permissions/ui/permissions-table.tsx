'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { usePermissionList, type Permission } from '@/entities/permission';
import { usePermissionColumns } from '@/entities/permission/ui/permission-columns';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { useTableSearchParams } from '@/shared/hooks/use-table-search-params';
import { AdminTableActions } from '@/shared/ui/admin-table-actions';
import {
  DataTable,
  DataTableToolbar,
  DataTableEmpty,
  DataTableQueryState,
} from '@/shared/ui/data-table';
import { Button } from '@/shared/ui/button';
import {
  PermissionManageSheet,
  type PermissionSheetState,
} from './permission-manage-sheet';
import { PermissionDeleteDialog } from './permission-delete-dialog';

export function PermissionsTable() {
  const t = useTranslations('entities.permissions');
  const tCommon = useTranslations('common');
  const { can } = useAuthPermissions();
  const permissionColumns = usePermissionColumns();
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams();
  const { data, isLoading, isError, error, refetch } =
    usePermissionList(queryParams);
  const [sheetState, setSheetState] = useState<PermissionSheetState | null>(
    null
  );
  const [deleteItem, setDeleteItem] = useState<Permission | null>(null);

  const columns = useMemo<ColumnDef<Permission, unknown>[]>(
    () => [
      ...permissionColumns,
      {
        id: 'actions',
        header: () => <span className="sr-only">{tCommon('actions')}</span>,
        cell: ({ row }) => (
          <AdminTableActions
            name={row.original.code}
            updatePermission={PERMISSION_CODES.PERMISSION_UPDATE}
            deletePermission={PERMISSION_CODES.PERMISSION_DELETE}
            can={can}
            onEdit={() =>
              setSheetState({ mode: 'edit', permission: row.original })
            }
            onDelete={() => setDeleteItem(row.original)}
          />
        ),
      },
    ],
    [permissionColumns, tCommon, can],
  );

  const canCreate = can(PERMISSION_CODES.PERMISSION_CREATE);

  return (
    <DataTableQueryState isError={isError} error={error} refetch={refetch}>
      <div className="space-y-4">
        <DataTableToolbar
          initialSearch={search}
          onSearchChange={onSearchChange}
          placeholder={t('searchPlaceholder')}
        >
          {canCreate ? (
            <Button
              size="sm"
              onClick={() => setSheetState({ mode: 'create' })}
            >
              {t('addPermission')}
            </Button>
          ) : null}
        </DataTableToolbar>
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          pageCount={data?.totalPages ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
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
      </div>
    </DataTableQueryState>
  );
}
