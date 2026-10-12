'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type {
  CreatePermissionFormValues,
  UpdatePermissionFormValues,
  Permission,
} from '@/entities/permission';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@default/ui/primitives/form';
import { Input } from '@default/ui/primitives/input';

type PermissionCreateFormProps = {
  formId: string;
  form: UseFormReturn<CreatePermissionFormValues>;
  onSubmit: (values: CreatePermissionFormValues) => void;
};

export function PermissionCreateForm({
  formId,
  form,
  onSubmit,
}: PermissionCreateFormProps) {
  const t = useTranslations('entities.permissions');
  const tTable = useTranslations('table');

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
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
      </form>
    </Form>
  );
}

type PermissionEditFormProps = {
  formId: string;
  form: UseFormReturn<UpdatePermissionFormValues>;
  permission: Permission;
  onSubmit: (values: UpdatePermissionFormValues) => void;
};

export function PermissionEditForm({
  formId,
  form,
  permission,
  onSubmit,
}: PermissionEditFormProps) {
  const tTable = useTranslations('table');

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormItem>
          <FormLabel>{tTable('code')}</FormLabel>
          <Input value={permission.code} disabled readOnly />
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
      </form>
    </Form>
  );
}
