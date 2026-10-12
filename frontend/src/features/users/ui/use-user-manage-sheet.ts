'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  useCreateUser,
  useUpdateUser,
  useUser,
  useExportUserData,
  useAnonymizeUser,
} from '@/entities/user';
import { useAssignRole, useRoles, useUnassignRole } from '@/entities/role';
import { createUserManageHandlers } from './user-manage-handlers';
import type { UnassignTarget, UserSheetState } from './user-manage-sheet.types';
import { useUserManageForms } from './use-user-manage-forms';
import { useUserManagePermissions } from './use-user-manage-permissions';
import { useUserManageSheetState } from './use-user-manage-sheet-state';

export type { UnassignTarget, UserSheetState };

interface UseUserManageSheetParams {
  state: UserSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function useUserManageSheet({
  state,
  onOpenChange,
}: UseUserManageSheetParams) {
  const t = useTranslations('entities.users');
  const tCommon = useTranslations('common');
  const tTable = useTranslations('table');
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const exportUserData = useExportUserData();
  const anonymizeUser = useAnonymizeUser();
  const assignRole = useAssignRole();
  const unassignRole = useUnassignRole();

  const isEdit = state?.mode === 'edit';
  const editUserId = isEdit ? state.user.id : 0;
  const open = state !== null;
  const { data: freshUser } = useUser(editUserId, open && isEdit);
  const user = freshUser ?? (isEdit ? state.user : null);
  const { data: rolesData } = useRoles({ page: 1, limit: 100 });
  const sheetState = useUserManageSheetState({ state, user });
  const permissions = useUserManagePermissions(user);
  const { createForm, editForm } = useUserManageForms({
    open: sheetState.open,
    isCreate: sheetState.isCreate,
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

  const handlers = createUserManageHandlers({
    t,
    user,
    selectedRoleId: sheetState.selectedRoleId,
    sheetId: sheetState.sheetId,
    unassignTarget: sheetState.unassignTarget,
    anonymizeConfirmEmail: sheetState.anonymizeConfirmEmail,
    onOpenChange,
    setRoleSelection: sheetState.setRoleSelection,
    setUnassignTarget: sheetState.setUnassignTarget,
    setAnonymizeOpen: sheetState.setAnonymizeOpen,
    setAnonymizeConfirmEmail: sheetState.setAnonymizeConfirmEmail,
    createUser,
    updateUser,
    assignRole,
    unassignRole,
    exportUserData,
    anonymizeUser,
  });

  return {
    t,
    tCommon,
    tTable,
    user,
    ...permissions,
    ...sheetState,
    createForm,
    editForm,
    assignableRoles,
    roleNameToId,
    ...handlers,
    isPending:
      createUser.isPending ||
      updateUser.isPending ||
      exportUserData.isPending ||
      anonymizeUser.isPending,
    formId: sheetState.isCreate ? 'user-create-form' : 'user-edit-form',
    exportUserData,
    anonymizeUser,
    assignRole,
    onOpenChange,
  };
}

export type UserManageSheetModel = ReturnType<typeof useUserManageSheet>;
