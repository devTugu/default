import { z } from 'zod';
import type { ValidationMessages } from '@/shared/i18n/validation-messages';

type LoginValidationMessages = Pick<
  ValidationMessages,
  'invalidEmailAddress' | 'passwordMinLength'
>;

export function createLoginSchema(v: LoginValidationMessages) {
  return z.object({
    email: z.string().email(v.invalidEmailAddress),
    password: z.string().min(8, v.passwordMinLength),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
