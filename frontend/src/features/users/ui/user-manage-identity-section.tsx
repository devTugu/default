"use client";

import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
  UserOutput,
} from "@/entities/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";

interface UserManageCreateIdentityProps {
  form: UseFormReturn<CreateUserFormValues>;
  formId: string;
  onSubmit: (values: CreateUserFormValues) => Promise<void>;
}

export function UserManageCreateIdentity({
  form,
  formId,
  onSubmit,
}: UserManageCreateIdentityProps) {
  const t = useTranslations("entities.users");
  const tAuth = useTranslations("auth");

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tAuth("email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tAuth("password")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <FormLabel>{t("activeAccount")}</FormLabel>
                <p className="text-xs text-muted-foreground">
                  {t("activeAccountHint")}
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

interface UserManageEditIdentityProps {
  form: UseFormReturn<UpdateUserFormValues>;
  formId: string;
  user: UserOutput | null;
  onSubmit: (values: UpdateUserFormValues) => Promise<void>;
}

export function UserManageEditIdentity({
  form,
  formId,
  user,
  onSubmit,
}: UserManageEditIdentityProps) {
  const t = useTranslations("entities.users");
  const tAuth = useTranslations("auth");

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        <FormItem>
          <FormLabel>{tAuth("email")}</FormLabel>
          <Input value={user?.email ?? ""} disabled readOnly />
        </FormItem>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPasswordOptional")}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <FormLabel>{t("activeAccount")}</FormLabel>
                <p className="text-xs text-muted-foreground">
                  {t("activeAccountHint")}
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
