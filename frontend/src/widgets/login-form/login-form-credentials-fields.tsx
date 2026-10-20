'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { LoginFormValues } from '@/features/auth';
import { Button } from '@default/ui/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@default/ui/primitives/form';
import { Input } from '@default/ui/primitives/input';
import { OAuthSignInButton } from '@/widgets/oauth-sign-in-button';

const LOGIN04_INPUT_CLASS =
  'h-9 border-border bg-background text-foreground shadow-xs dark:bg-background';
const LOGIN04_LABEL_CLASS = 'text-sm font-normal text-muted-foreground';

type LoginFormCredentialsFieldsProps = {
  form: UseFormReturn<LoginFormValues>;
  layout: 'default' | 'login-04';
  hideOAuth: boolean;
  isPending: boolean;
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
};

export function LoginFormCredentialsFields({
  form,
  layout,
  hideOAuth,
  isPending,
  onSubmit,
}: LoginFormCredentialsFieldsProps) {
  const t = useTranslations('auth');
  const isLogin04 = layout === 'login-04';

  const emailField = (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className={isLogin04 ? 'space-y-1.5' : undefined}>
          <FormLabel className={isLogin04 ? LOGIN04_LABEL_CLASS : undefined}>
            {t('email')}
            {isLogin04 ? '*' : null}
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="admin@example.com"
              autoComplete="email"
              className={isLogin04 ? LOGIN04_INPUT_CLASS : undefined}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const passwordField = (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className={isLogin04 ? 'space-y-1.5' : undefined}>
          <FormLabel className={isLogin04 ? LOGIN04_LABEL_CLASS : undefined}>
            {t('password')}
            {isLogin04 ? '*' : null}
          </FormLabel>
          <FormControl>
            <Input
              type="password"
              autoComplete="current-password"
              className={isLogin04 ? LOGIN04_INPUT_CLASS : undefined}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={isLogin04 ? 'w-full space-y-6' : 'space-y-4'}
      >
        {isLogin04 ? (
          <div className="space-y-4">
            {emailField}
            {passwordField}
          </div>
        ) : (
          <>
            {emailField}
            {passwordField}
          </>
        )}
        <Button
          type="submit"
          size={isLogin04 ? 'lg' : 'default'}
          className={
            isLogin04
              ? 'h-10 w-full cursor-pointer rounded-lg hover:bg-primary/80'
              : 'w-full'
          }
          disabled={isPending}
        >
          {isPending ? t('signingIn') : t('signIn')}
        </Button>
        {!hideOAuth ? <OAuthSignInButton /> : null}
      </form>
    </Form>
  );
}
