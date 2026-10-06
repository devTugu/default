'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
import { AdminFormSheet } from '@/shared/ui/admin-form-sheet';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

export type PermissionSheetState =
  | { mode: 'create' }
  | { mode: 'edit'; permission: Permission };

interface PermissionManageSheetProps {
  state: PermissionSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function PermissionManageSheet({
  state,
  onOpenChange,
}: PermissionManageSheetProps) {
  const t = useTranslations('entities.permissions');
  const tCommon = useTranslations('common');
  const tTable = useTranslations('table');
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

  if (!open) return null;

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

  const isPending = createPermission.isPending || updatePermission.isPending;
  const formId = isCreate ? 'permission-create-form' : 'permission-edit-form';

  const footer = canSubmit ? (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
        disabled={isPending}
      >
        {tCommon('cancel')}
      </Button>
      <Button type="submit" form={formId} disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isCreate ? tCommon('create') : tCommon('save')}
      </Button>
    </div>
  ) : null;

  return (
    <AdminFormSheet
      open={open}
      onOpenChange={onOpenChange}
      title={
        isCreate
          ? t('createTitle')
          : t('editTitle', { code: permission?.code ?? '' })
      }
      description={
        isCreate ? t('createDescription') : t('editDescription')
      }
      size="md"
      showContentLocale={false}
      footer={footer}
    >
      {isCreate ? (
        <Form {...createForm}>
          <form
            id={formId}
            onSubmit={createForm.handleSubmit(onCreateSubmit)}
            className="space-y-4"
          >
            <FormField
              control={createForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('code')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('codePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('description')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Form {...editForm}>
          <form
            id={formId}
            onSubmit={editForm.handleSubmit(onEditSubmit)}
            className="space-y-4"
          >
            <FormItem>
              <FormLabel>{tTable('code')}</FormLabel>
              <Input value={permission?.code ?? ''} disabled readOnly />
            </FormItem>
            <FormField
              control={editForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('description')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </AdminFormSheet>
  );
}
