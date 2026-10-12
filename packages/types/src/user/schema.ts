import { z } from "zod";

export type UserFormMessages = {
  invalidEmail: string;
  passwordMinLength: string;
};

export function createUserSchema(v: UserFormMessages) {
  return z.object({
    email: z.string().email(v.invalidEmail),
    password: z.string().min(8, v.passwordMinLength),
    isActive: z.boolean(),
  });
}

export function updateUserSchema(v: UserFormMessages) {
  return z.object({
    password: z
      .string()
      .min(8, v.passwordMinLength)
      .optional()
      .or(z.literal("")),
    isActive: z.boolean(),
  });
}

export type CreateUserFormValues = z.infer<ReturnType<typeof createUserSchema>>;
export type UpdateUserFormValues = z.infer<ReturnType<typeof updateUserSchema>>;
