'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  createPermissionSchema,
  updatePermissionSchema,
  type CreatePermissionFormValues,
  type UpdatePermissionFormValues,
  type Permission,
  useCreatePermission,
  useUpdatePermission,
} from '@/entities/permission';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { getErrorMessage } from '@/shared/api';

export type PermissionSheetState =
  | { mode: 'create' }
  | { mode: 'edit'; permission: Permission };

export function usePermissionManageSheet(params: {
  state: PermissionSheetState | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { state, onOpenChange } = params;
  const t = useTranslations('entities.permissions');
  const tCommon = useTranslations('common');
  const { can } = useAuthPermissions();
  const createPermission = useCreatePermission();
  const updatePermission = useUpdatePermission();

  const isCreate = state?.mode === 'create';
  const isEdit = state?.mode === 'edit';
  const permission = isEdit ? state.permission : null;
  const open = state !== null;

  const createForm = useForm<CreatePermissionFormValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: { code: '', description: '' },
  });
  const editForm = useForm<UpdatePermissionFormValues>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: { description: '' },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      createForm.reset({ code: '', description: '' });
      return;
    }
    if (permission) {
      editForm.reset({ description: permission.description ?? '' });
    }
  }, [open, isCreate, permission, createForm, editForm]);

  const canSubmit =
    (isCreate && can(PERMISSION_CODES.PERMISSION_CREATE)) ||
    (isEdit && can(PERMISSION_CODES.PERMISSION_UPDATE));

  const onCreateSubmit = async (values: CreatePermissionFormValues) => {
    try {
      await createPermission.mutateAsync(values);
      toast.success(t('toastCreated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onEditSubmit = async (values: UpdatePermissionFormValues) => {
    if (!permission) return;
    try {
      await updatePermission.mutateAsync({ id: permission.id, data: values });
      toast.success(t('toastUpdated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    t,
    tCommon,
    open,
    isCreate,
    permission,
    createForm,
    editForm,
    canSubmit,
    onCreateSubmit,
    onEditSubmit,
    isPending: createPermission.isPending || updatePermission.isPending,
    formId: isCreate ? 'permission-create-form' : 'permission-edit-form',
    onOpenChange,
  };
}
