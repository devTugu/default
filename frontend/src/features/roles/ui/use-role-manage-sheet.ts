'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  createRoleSchema,
  updateRoleSchema,
  type CreateRoleFormValues,
  type UpdateRoleFormValues,
  type Role,
  useCreateRole,
  useUpdateRole,
} from '@/entities/role';
import { usePermissionList } from '@/entities/permission';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { createRoleSubmitHandlers } from './role-manage-submit';

export type RoleSheetState =
  | { mode: 'create' }
  | { mode: 'edit'; role: Role };

export function useRoleManageSheet(params: {
  state: RoleSheetState | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { state, onOpenChange } = params;
  const t = useTranslations('entities.roles');
  const tCommon = useTranslations('common');
  const tVal = useTranslations('validation');
  const { can } = useAuthPermissions();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const { data: perms, isLoading: isLoadingPerms, isError: isPermsError } =
    usePermissionList({ page: 1, limit: 100 }, state !== null);

  const isCreate = state?.mode === 'create';
  const isEdit = state?.mode === 'edit';
  const role = isEdit ? state.role : null;
  const open = state !== null;

  const validationMessages = useMemo(
    () => ({ nameMinLength: tVal('nameMinLength') }),
    [tVal],
  );
  const createSchema = useMemo(
    () => createRoleSchema(validationMessages),
    [validationMessages],
  );
  const updateSchema = useMemo(() => updateRoleSchema(), []);

  const createForm = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', description: '', permissionIds: [] },
  });
  const editForm = useForm<UpdateRoleFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: { description: '', permissionIds: [] },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      createForm.reset({ name: '', description: '', permissionIds: [] });
      return;
    }
    if (role) {
      editForm.reset({
        description: role.description ?? '',
        permissionIds: role.permissions.map((p) => p.id),
      });
    }
  }, [open, isCreate, role, createForm, editForm]);

  const handlers = createRoleSubmitHandlers({
    t,
    role,
    onOpenChange,
    createRole,
    updateRole,
  });

  return {
    t,
    tCommon,
    open,
    isCreate,
    role,
    createForm,
    editForm,
    canSubmit:
      (isCreate && can(PERMISSION_CODES.ROLE_CREATE)) ||
      (isEdit && can(PERMISSION_CODES.ROLE_UPDATE)),
    ...handlers,
    isPending: createRole.isPending || updateRole.isPending,
    formId: isCreate ? 'role-create-form' : 'role-edit-form',
    permissions: perms?.items ?? [],
    isLoadingPerms,
    isPermsError,
    onOpenChange,
  };
}
