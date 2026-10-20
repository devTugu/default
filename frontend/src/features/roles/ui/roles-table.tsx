'use client';

import { useMemo, useState } from 'react';
import type { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import { useRoles, type Role } from '@/entities/role';
import { useRoleColumns } from '@/entities/role/ui/role-columns';
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
import { RoleManageSheet, type RoleSheetState } from './role-manage-sheet';
import { RoleDeleteDialog } from './role-delete-dialog';

export function RolesTable() {
  const t = useTranslations('entities.roles');
  const tTable = useTranslations('table');
  const { can } = useAuthPermissions();
  const roleColumns = useRoleColumns();
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams({ defaultPageSize: 10 });
  const { data, isLoading, isError, error, refetch } = useRoles(queryParams);
  const [sheetState, setSheetState] = useState<RoleSheetState | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const columns = useMemo<ColumnDef<Role, unknown>[]>(
    () => [
      ...roleColumns
        .filter(
          (column) =>
            !('accessorKey' in column && column.accessorKey === 'description'),
        )
        .map((column) => {
        if ('accessorKey' in column && column.accessorKey === 'name') {
          return {
            ...column,
            cell: ({ row }: { row: { original: Role } }) => (
              <div className="min-w-0">
                <p className="text-sm font-medium">{row.original.name}</p>
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
            name={row.original.name}
            updatePermission={PERMISSION_CODES.ROLE_UPDATE}
            deletePermission={PERMISSION_CODES.ROLE_DELETE}
            can={can}
            variant="icons"
            onEdit={() =>
              setSheetState({ mode: 'edit', role: row.original })
            }
            onDelete={() => setDeleteRole(row.original)}
          />
        ),
      },
    ],
    [roleColumns, tTable, can],
  );

  const canCreate = can(PERMISSION_CODES.ROLE_CREATE);

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
            <Button size="sm" onClick={() => setSheetState({ mode: 'create' })}>
              {t('addRole')}
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
                  {t('addRole')}
                </Button>
              ) : undefined
            }
          />
        }
      />
      <RoleManageSheet
        state={sheetState}
        onOpenChange={(open) => !open && setSheetState(null)}
      />
      <RoleDeleteDialog
        role={deleteRole}
        open={Boolean(deleteRole)}
        onOpenChange={(open) => !open && setDeleteRole(null)}
      />
    </DataTableQueryState>
  );
}
