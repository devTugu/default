"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  useCreateUser,
  useUpdateUser,
  useUser,
  useExportUserData,
  useAnonymizeUser,
} from "@/entities/user";
import { useAssignRole, useRoles, useUnassignRole } from "@/entities/role";
import { useAuthPermissions, useAuthStore } from "@/features/auth";
import { PERMISSION_CODES } from "@/shared/config/permissions";
import { createUserManageHandlers } from "./user-manage-handlers";
import type { UnassignTarget, UserSheetState } from "./user-manage-sheet.types";
import { useUserManageForms } from "./use-user-manage-forms";

export type { UnassignTarget, UserSheetState };

interface UseUserManageSheetParams {
  state: UserSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function useUserManageSheet({
  state,
  onOpenChange,
}: UseUserManageSheetParams) {
  const t = useTranslations("entities.users");
  const tCommon = useTranslations("common");
  const tTable = useTranslations("table");
  const { can } = useAuthPermissions();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const exportUserData = useExportUserData();
  const anonymizeUser = useAnonymizeUser();
  const assignRole = useAssignRole();
  const unassignRole = useUnassignRole();
  const currentUser = useAuthStore((authState) => authState.user);

  const isCreate = state?.mode === "create";
  const isEdit = state?.mode === "edit";
  const editUserId = isEdit ? state.user.id : 0;
  const open = state !== null;

  const { data: freshUser } = useUser(editUserId, open && isEdit);
  const user = freshUser ?? (isEdit ? state.user : null);

  const { data: rolesData } = useRoles({ page: 1, limit: 100 });
  const [tabSelection, setTabSelection] = useState<{
    sheetId: string;
    tab: "profile" | "roles";
  } | null>(null);
  const [roleSelection, setRoleSelection] = useState<{
    sheetId: string;
    roleId: string;
  } | null>(null);
  const [unassignTarget, setUnassignTarget] = useState<UnassignTarget | null>(
    null,
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [anonymizeOpen, setAnonymizeOpen] = useState(false);
  const [anonymizeConfirmEmail, setAnonymizeConfirmEmail] = useState("");

  const sheetId = !open
    ? ""
    : isCreate
      ? "create"
      : `edit-${user?.id}-${isEdit && state.mode === "edit" ? (state.tab ?? "profile") : "profile"}`;

  const defaultTab =
    isEdit && state?.mode === "edit" ? (state.tab ?? "profile") : "profile";

  const activeTab =
    tabSelection?.sheetId === sheetId && sheetId !== ""
      ? tabSelection.tab
      : defaultTab;

  const selectedRoleId =
    roleSelection?.sheetId === sheetId ? roleSelection.roleId : "";

  const { createForm, editForm } = useUserManageForms({
    open,
    isCreate,
    user,
  });

  const assignableRoles = useMemo(() => {
    if (!user) return [];
    return (
      rolesData?.items.filter((role) => !user.roles.includes(role.name)) ?? []
    );
  }, [rolesData, user]);

  const roleNameToId = useMemo(() => {
    const map = new Map<string, number>();
    rolesData?.items.forEach((role) => map.set(role.name, role.id));
    return map;
  }, [rolesData]);

  const canCreate = can(PERMISSION_CODES.USER_CREATE);
  const canUpdate = can(PERMISSION_CODES.USER_UPDATE);
  const canAssign = can(PERMISSION_CODES.ROLE_CREATE);
  const canUnassign = can(PERMISSION_CODES.ROLE_DELETE);
  const canDelete = can(PERMISSION_CODES.USER_DELETE);
  const canExport = can(PERMISSION_CODES.USER_READ);
  const canAnonymize =
    canDelete && user !== null && currentUser?.id !== user.id;

  const handlers = createUserManageHandlers({
    t,
    user,
    selectedRoleId,
    sheetId,
    unassignTarget,
    anonymizeConfirmEmail,
    onOpenChange,
    setRoleSelection,
    setUnassignTarget,
    setAnonymizeOpen,
    setAnonymizeConfirmEmail,
    createUser,
    updateUser,
    assignRole,
    unassignRole,
    exportUserData,
    anonymizeUser,
  });

  const isPending =
    createUser.isPending ||
    updateUser.isPending ||
    exportUserData.isPending ||
    anonymizeUser.isPending;
  const formId = isCreate ? "user-create-form" : "user-edit-form";

  return {
    t,
    tCommon,
    tTable,
    open,
    isCreate,
    isEdit,
    user,
    currentUser,
    sheetId,
    activeTab,
    setTabSelection,
    selectedRoleId,
    setRoleSelection,
    unassignTarget,
    setUnassignTarget,
    deleteOpen,
    setDeleteOpen,
    anonymizeOpen,
    setAnonymizeOpen,
    anonymizeConfirmEmail,
    setAnonymizeConfirmEmail,
    createForm,
    editForm,
    assignableRoles,
    roleNameToId,
    canCreate,
    canUpdate,
    canAssign,
    canUnassign,
    canDelete,
    canExport,
    canAnonymize,
    ...handlers,
    isPending,
    formId,
    exportUserData,
    anonymizeUser,
    assignRole,
    onOpenChange,
  };
}

export type UserManageSheetModel = ReturnType<typeof useUserManageSheet>;
