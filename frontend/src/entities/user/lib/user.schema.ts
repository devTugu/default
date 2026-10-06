import { z } from 'zod';
import type { ValidationMessages } from '@/shared/i18n/validation-messages';

type UserValidationMessages = Pick<
  ValidationMessages,
  'invalidEmail' | 'passwordMinLength'
>;

export function createUserSchema(v: UserValidationMessages) {
  return z.object({
    email: z.string().email(v.invalidEmail),
    password: z.string().min(8, v.passwordMinLength),
    isActive: z.boolean(),
  });
}

export function updateUserSchema(v: UserValidationMessages) {
  return z.object({
    password: z
      .string()
      .min(8, v.passwordMinLength)
      .optional()
      .or(z.literal('')),
    isActive: z.boolean(),
  });
}

export type CreateUserFormValues = z.infer<
  ReturnType<typeof createUserSchema>
>;
export type UpdateUserFormValues = z.infer<
  ReturnType<typeof updateUserSchema>
>;
