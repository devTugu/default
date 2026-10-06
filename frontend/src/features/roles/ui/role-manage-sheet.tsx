'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  createRoleSchema,
  updateRoleSchema,
  type CreateRoleFormValues,
  type UpdateRoleFormValues,
  type Role,
  useCreateRole,
  useUpdateRole,
} from '@/entities/role';
import { usePermissionList, PermissionPicker } from '@/entities/permission';
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

export type RoleSheetState =
  | { mode: 'create' }
  | { mode: 'edit'; role: Role };

interface RoleManageSheetProps {
  state: RoleSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function RoleManageSheet({ state, onOpenChange }: RoleManageSheetProps) {
  const t = useTranslations('entities.roles');
  const tCommon = useTranslations('common');
  const tTable = useTranslations('table');
  const tErrors = useTranslations('errors');
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

  if (!open) return null;

  const canSubmit =
    (isCreate && can(PERMISSION_CODES.ROLE_CREATE)) ||
    (isEdit && can(PERMISSION_CODES.ROLE_UPDATE));

  const onCreateSubmit = async (values: CreateRoleFormValues) => {
    try {
      await createRole.mutateAsync(values);
      toast.success(t('toastCreated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onEditSubmit = async (values: UpdateRoleFormValues) => {
    if (!role) return;
    try {
      await updateRole.mutateAsync({ id: role.id, data: values });
      toast.success(t('toastUpdated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const isPending = createRole.isPending || updateRole.isPending;
  const formId = isCreate ? 'role-create-form' : 'role-edit-form';

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
          : t('editTitle', { name: role?.name ?? '' })
      }
      description={
        isCreate ? t('createDescription') : t('editDescription')
      }
      size="lg"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} {...field} />
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
            <FormField
              control={createForm.control}
              name="permissionIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('permissions')}</FormLabel>
                  {isPermsError ? (
                    <p className="text-sm text-destructive">
                      {tErrors('permissionsLoadFailed')}
                    </p>
                  ) : (
                    <PermissionPicker
                      permissions={perms?.items ?? []}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      disabled={isLoadingPerms}
                    />
                  )}
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
              <FormLabel>{tTable('name')}</FormLabel>
              <Input value={role?.name ?? ''} disabled readOnly />
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
            <FormField
              control={editForm.control}
              name="permissionIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tTable('permissions')}</FormLabel>
                  {isPermsError ? (
                    <p className="text-sm text-destructive">
                      {tErrors('permissionsLoadFailed')}
                    </p>
                  ) : (
                    <PermissionPicker
                      permissions={perms?.items ?? []}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      disabled={isLoadingPerms}
                    />
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </AdminFormSheet>
  );
}
