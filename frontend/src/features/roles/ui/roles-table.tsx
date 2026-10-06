'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useRoles, type Role } from '@/entities/role';
import { useRoleColumns } from '@/entities/role/ui/role-columns';
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
import { RoleManageSheet, type RoleSheetState } from './role-manage-sheet';
import { RoleDeleteDialog } from './role-delete-dialog';

export function RolesTable() {
  const t = useTranslations('entities.roles');
  const tCommon = useTranslations('common');
  const { can } = useAuthPermissions();
  const roleColumns = useRoleColumns();
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams();
  const { data, isLoading, isError, error, refetch } = useRoles(queryParams);
  const [sheetState, setSheetState] = useState<RoleSheetState | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const columns = useMemo<ColumnDef<Role, unknown>[]>(
    () => [
      ...roleColumns,
      {
        id: 'actions',
        header: () => <span className="sr-only">{tCommon('actions')}</span>,
        cell: ({ row }) => (
          <AdminTableActions
            name={row.original.name}
            updatePermission={PERMISSION_CODES.ROLE_UPDATE}
            deletePermission={PERMISSION_CODES.ROLE_DELETE}
            can={can}
            onEdit={() =>
              setSheetState({ mode: 'edit', role: row.original })
            }
            onDelete={() => setDeleteRole(row.original)}
          />
        ),
      },
    ],
    [roleColumns, tCommon, can],
  );

  const canCreate = can(PERMISSION_CODES.ROLE_CREATE);

  return (
    <DataTableQueryState isError={isError} error={error} refetch={refetch}>
      <div className="space-y-4">
        <DataTableToolbar
          initialSearch={search}
          onSearchChange={onSearchChange}
          placeholder={t('searchPlaceholder')}
        >
          {canCreate ? (
            <Button size="sm" onClick={() => setSheetState({ mode: 'create' })}>
              {t('addRole')}
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
      </div>
    </DataTableQueryState>
  );
}
