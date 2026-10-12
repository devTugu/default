import { z } from "zod";

/** Min 8 chars with lowercase, uppercase, and a digit. */
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const PASSWORD_COMPLEXITY_MESSAGE =
  "Password must be at least 8 characters and include uppercase, lowercase, and a number.";

export function isComplexPassword(value: string): boolean {
  return PASSWORD_PATTERN.test(value);
}

/** New-password rule for create/update user (login keeps `min(8)` only). */
export const ComplexPasswordSchema = z
  .string()
  .min(8)
  .superRefine((value, ctx) => {
    if (!isComplexPassword(value)) {
      ctx.addIssue({ code: "custom", message: PASSWORD_COMPLEXITY_MESSAGE });
    }
  });
