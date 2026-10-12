import {
  LoginCredentialsSchema,
  MfaCodeInputSchema,
  MfaEnrollmentConfirmSchema,
  MfaEnrollmentTokenSchema,
  MfaLoginSchema,
  OAuthCallbackSchema,
  RefreshTokenSchema,
} from '@default/types/auth';
import { createZodDto } from 'nestjs-zod';

/** HTTP bodies reject unknown keys (parity with former `forbidNonWhitelisted`). */
export class LoginDto extends createZodDto(LoginCredentialsSchema.strict()) {}

export class RefreshDto extends createZodDto(RefreshTokenSchema.strict()) {}

export class MfaLoginDto extends createZodDto(MfaLoginSchema.strict()) {}

export class MfaVerifyEnrollDto extends createZodDto(
  MfaCodeInputSchema.strict(),
) {}

export class MfaDisableDto extends createZodDto(MfaCodeInputSchema.strict()) {}

export class MfaEnrollmentTokenDto extends createZodDto(
  MfaEnrollmentTokenSchema.strict(),
) {}

export class MfaEnrollmentConfirmDto extends createZodDto(
  MfaEnrollmentConfirmSchema.strict(),
) {}

export class OAuthCallbackDto extends createZodDto(
  OAuthCallbackSchema.strict(),
) {}
