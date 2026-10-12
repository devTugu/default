'use client';

import { useMemo, useState } from 'react';
import type { UserOutput } from '@/entities/user';
import type { UnassignTarget, UserSheetState } from './user-manage-sheet.types';

export function useUserManageSheetState(params: {
  state: UserSheetState | null;
  user: UserOutput | null;
}) {
  const { state, user } = params;
  const isCreate = state?.mode === 'create';
  const isEdit = state?.mode === 'edit';
  const open = state !== null;

  const [tabSelection, setTabSelection] = useState<{
    sheetId: string;
    tab: 'profile' | 'roles';
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
  const [anonymizeConfirmEmail, setAnonymizeConfirmEmail] = useState('');

  const sheetId = useMemo(() => {
    if (!open) return '';
    if (isCreate) return 'create';
    const tab =
      isEdit && state?.mode === 'edit' ? (state.tab ?? 'profile') : 'profile';
    return `edit-${user?.id}-${tab}`;
  }, [open, isCreate, isEdit, state, user?.id]);

  const defaultTab =
    isEdit && state?.mode === 'edit' ? (state.tab ?? 'profile') : 'profile';

  const activeTab =
    tabSelection?.sheetId === sheetId && sheetId !== ''
      ? tabSelection.tab
      : defaultTab;

  const selectedRoleId =
    roleSelection?.sheetId === sheetId ? roleSelection.roleId : '';

  return {
    isCreate,
    isEdit,
    open,
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
  };
}
