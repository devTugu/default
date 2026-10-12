'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type {
  CreateRoleFormValues,
  UpdateRoleFormValues,
  Role,
} from '@/entities/role';
import { PermissionPicker, type Permission } from '@/entities/permission';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@default/ui/primitives/form';
import { Input } from '@default/ui/primitives/input';

type RoleCreateFormProps = {
  formId: string;
  form: UseFormReturn<CreateRoleFormValues>;
  onSubmit: (values: CreateRoleFormValues) => void;
  permissions: Permission[];
  isLoadingPerms: boolean;
  isPermsError: boolean;
};

export function RoleCreateForm({
  formId,
  form,
  onSubmit,
  permissions,
  isLoadingPerms,
  isPermsError,
}: RoleCreateFormProps) {
  const t = useTranslations('entities.roles');
  const tTable = useTranslations('table');
  const tErrors = useTranslations('errors');

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
                  permissions={permissions}
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
  );
}

type RoleEditFormProps = {
  formId: string;
  form: UseFormReturn<UpdateRoleFormValues>;
  role: Role;
  onSubmit: (values: UpdateRoleFormValues) => void;
  permissions: Permission[];
  isLoadingPerms: boolean;
  isPermsError: boolean;
};

export function RoleEditForm({
  formId,
  form,
  role,
  onSubmit,
  permissions,
  isLoadingPerms,
  isPermsError,
}: RoleEditFormProps) {
  const tTable = useTranslations('table');
  const tErrors = useTranslations('errors');

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormItem>
          <FormLabel>{tTable('name')}</FormLabel>
          <Input value={role.name} disabled readOnly />
        </FormItem>
        <FormField
          control={form.control}
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
          control={form.control}
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
                  permissions={permissions}
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
  );
}
