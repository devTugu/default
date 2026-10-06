"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useUsers, type UserOutput } from "@/entities/user";
import { useUserColumns } from "@/entities/user/ui/user-columns";
import { useAuthPermissions } from "@/features/auth";
import {
  PERMISSION_CODES,
  SUPER_ADMIN_ROLE,
} from "@/shared/config/permissions";
import { useTableSearchParams } from "@/shared/hooks/use-table-search-params";
import { AdminTableActions } from "@/shared/ui/admin-table-actions";
import {
  DataTable,
  DataTableToolbar,
  DataTableEmpty,
  DataTableQueryState,
} from "@/shared/ui/data-table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { UserManageSheet, type UserSheetState } from "./user-manage-sheet";
import { UserDeleteDialog } from "@/features/users/ui/user-delete-dialog";

function ClickableRoleBadges({
  user,
  onClick,
  noRolesLabel,
}: {
  user: UserOutput;
  onClick: () => void;
  noRolesLabel: string;
}) {
  if (user.roles.length === 0) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-sm text-muted-foreground hover:text-foreground">
        {noRolesLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-wrap gap-1 text-left">
      {user.roles.map((role) => (
        <Badge
          key={role}
          variant={role === SUPER_ADMIN_ROLE ? "default" : "secondary"}
          className="cursor-pointer">
          {role}
        </Badge>
      ))}
    </button>
  );
}

export function UsersTable() {
  const t = useTranslations("entities.users");
  const tCommon = useTranslations("common");
  const tTable = useTranslations("table");
  const { can } = useAuthPermissions();
  const userColumns = useUserColumns();
  const { pagination, setPagination, onSearchChange, queryParams, search } =
    useTableSearchParams();
  const { data, isLoading, isError, error, refetch } = useUsers(queryParams);
  const [sheetState, setSheetState] = useState<UserSheetState | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserOutput | null>(null);

  const columns = useMemo<ColumnDef<UserOutput, unknown>[]>(
    () => [
      ...userColumns.map((column) => {
        if ("accessorKey" in column && column.accessorKey === "roles") {
          return {
            ...column,
            cell: ({ row }: { row: { original: UserOutput } }) => (
              <ClickableRoleBadges
                user={row.original}
                noRolesLabel={tTable("noRoles")}
                onClick={() =>
                  setSheetState({
                    mode: "edit",
                    user: row.original,
                    tab: "roles",
                  })
                }
              />
            ),
          };
        }
        return column;
      }),
      {
        id: "actions",
        header: () => (
          <span className="sr-only">{tCommon("actions")}</span>
        ),
        cell: ({ row }) => (
          <AdminTableActions
            name={row.original.email}
            updatePermission={PERMISSION_CODES.USER_UPDATE}
            deletePermission={PERMISSION_CODES.USER_DELETE}
            can={can}
            onEdit={() =>
              setSheetState({
                mode: "edit",
                user: row.original,
                tab: "profile",
              })
            }
            onDelete={() => setDeleteUser(row.original)}
          />
        ),
      },
    ],
    [userColumns, tCommon, tTable, can],
  );

  const canCreate = can(PERMISSION_CODES.USER_CREATE);

  return (
    <DataTableQueryState isError={isError} error={error} refetch={refetch}>
      <div className="space-y-4">
        <DataTableToolbar
          initialSearch={search}
          onSearchChange={onSearchChange}
          placeholder={t("searchPlaceholder")}>
          {canCreate ? (
            <Button size="sm" onClick={() => setSheetState({ mode: "create" })}>
              {t("addUser")}
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
              title={t("emptyTitle")}
              description={t("emptyDescription")}
              action={
                canCreate ? (
                  <Button
                    size="sm"
                    onClick={() => setSheetState({ mode: "create" })}>
                    {t("addUser")}
                  </Button>
                ) : undefined
              }
            />
          }
        />
        <UserManageSheet
          state={sheetState}
          onOpenChange={(open) => !open && setSheetState(null)}
        />
        <UserDeleteDialog
          user={deleteUser}
          open={Boolean(deleteUser)}
          onOpenChange={(open) => !open && setDeleteUser(null)}
        />
      </div>
    </DataTableQueryState>
  );
}
