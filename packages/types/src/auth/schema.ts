import { z } from "zod";

export type LoginFormMessages = {
  invalidEmailAddress: string;
  passwordMinLength: string;
};

export function createLoginSchema(v: LoginFormMessages) {
  return z.object({
    email: z.string().email(v.invalidEmailAddress),
    password: z.string().min(8, v.passwordMinLength),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

/** API login body (shared FE/BE contract). */
export const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

const MfaCodeSchema = z.string().min(6);

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const MfaLoginSchema = z.object({
  mfaToken: z.string(),
  code: MfaCodeSchema,
});

export const MfaCodeInputSchema = z.object({
  code: MfaCodeSchema,
});

export const MfaEnrollmentTokenSchema = z.object({
  enrollmentToken: z.string(),
});

export const MfaEnrollmentConfirmSchema = MfaEnrollmentTokenSchema.extend({
  code: MfaCodeSchema,
});

export const OAuthCallbackSchema = z.object({
  /** Full callback URL from IdP redirect. */
  callbackUrl: z.string(),
});

export const MfaEnrollmentResponseSchema = z.object({
  otpauthUrl: z.string(),
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type MfaLoginInput = z.infer<typeof MfaLoginSchema>;
export type MfaCodeInput = z.infer<typeof MfaCodeInputSchema>;
export type MfaEnrollmentTokenInput = z.infer<typeof MfaEnrollmentTokenSchema>;
export type MfaEnrollmentConfirmInput = z.infer<
  typeof MfaEnrollmentConfirmSchema
>;
export type OAuthCallbackInput = z.infer<typeof OAuthCallbackSchema>;
export type MfaEnrollmentResponse = z.infer<typeof MfaEnrollmentResponseSchema>;
