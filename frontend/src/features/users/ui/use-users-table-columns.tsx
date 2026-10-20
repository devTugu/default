'use client';

import { useMemo } from 'react';
import type { LegacyColumnDef as ColumnDef } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import type { UserOutput } from '@/entities/user';
import { useUserColumns } from '@/entities/user/ui/user-columns';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { AdminTableActions } from '@/shared/ui/admin-table-actions';
import {
  ClickableRoleBadges,
  UserEmailCell,
} from './users-table-cells';
import type { UserSheetState } from './user-manage-sheet';

type UseUsersTableColumnsInput = {
  setSheetState: (state: UserSheetState | null) => void;
  setDeleteUser: (user: UserOutput | null) => void;
};

export function useUsersTableColumns({
  setSheetState,
  setDeleteUser,
}: UseUsersTableColumnsInput) {
  const tTable = useTranslations('table');
  const { can } = useAuthPermissions();
  const userColumns = useUserColumns();

  return useMemo<ColumnDef<UserOutput, unknown>[]>(
    () => [
      ...userColumns.map((column) => {
        if ('accessorKey' in column && column.accessorKey === 'email') {
          return {
            ...column,
            cell: ({ row }: { row: { original: UserOutput } }) => (
              <UserEmailCell
                user={row.original}
                noRolesLabel={tTable('noRoles')}
              />
            ),
          };
        }
        if ('accessorKey' in column && column.accessorKey === 'roles') {
          return {
            ...column,
            cell: ({ row }: { row: { original: UserOutput } }) => (
              <ClickableRoleBadges
                user={row.original}
                noRolesLabel={tTable('noRoles')}
                onClick={() =>
                  setSheetState({
                    mode: 'edit',
                    user: row.original,
                    tab: 'roles',
                  })
                }
              />
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
            name={row.original.email}
            updatePermission={PERMISSION_CODES.USER_UPDATE}
            deletePermission={PERMISSION_CODES.USER_DELETE}
            can={can}
            variant="icons"
            onEdit={() =>
              setSheetState({
                mode: 'edit',
                user: row.original,
                tab: 'profile',
              })
            }
            onDelete={() => setDeleteUser(row.original)}
          />
        ),
      },
    ],
    [can, setDeleteUser, setSheetState, tTable, userColumns],
  );
}
