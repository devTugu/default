import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthSessionsV1Controller } from '../controllers/v1/auth-sessions.controller';
import { AuthV1Controller } from '../controllers/v1/auth.controller';
import { LoginUseCase } from '@application/auth/use-cases/login.use-case';
import { RefreshTokenUseCase } from '@application/auth/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '@application/auth/use-cases/logout.use-case';
import { VerifyMfaLoginUseCase } from '@application/auth/use-cases/verify-mfa-login.use-case';
import {
  ConfirmMfaEnrollUseCase,
  ConfirmMfaEnrollWithEnrollmentTokenUseCase,
  DisableMfaUseCase,
  EnrollMfaUseCase,
  EnrollMfaWithEnrollmentTokenUseCase,
} from '@application/auth/use-cases/mfa.use-cases';
import {
  CompleteOAuthLoginUseCase,
  GetOAuthAuthorizationUrlUseCase,
} from '@application/auth/use-cases/oauth.use-cases';
import { GetUserUseCase } from '@application/user/use-cases/get-user.use-case';
import { LoadUserAuthContextUseCase } from '@application/user/use-cases/load-user-auth-context.use-case';
import { JwtStrategy } from '@infrastructure/auth/jwt.strategy';
import { MfaPolicyService } from '@application/auth/services/mfa-policy.service';
import { RecordRefreshTokenService } from '@application/auth/services/record-refresh-token.service';
import {
  ListAuthSessionsUseCase,
  RevokeAuthSessionUseCase,
  RevokeOtherAuthSessionsUseCase,
} from '@application/auth/use-cases/sessions.use-cases';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthV1Controller, AuthSessionsV1Controller],
  providers: [
    LoginUseCase,
    VerifyMfaLoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    GetUserUseCase,
    LoadUserAuthContextUseCase,
    EnrollMfaUseCase,
    ConfirmMfaEnrollUseCase,
    DisableMfaUseCase,
    EnrollMfaWithEnrollmentTokenUseCase,
    ConfirmMfaEnrollWithEnrollmentTokenUseCase,
    GetOAuthAuthorizationUrlUseCase,
    CompleteOAuthLoginUseCase,
    MfaPolicyService,
    RecordRefreshTokenService,
    ListAuthSessionsUseCase,
    RevokeAuthSessionUseCase,
    RevokeOtherAuthSessionsUseCase,
    JwtStrategy,
  ],
})
export class AuthPresentationModule {}
