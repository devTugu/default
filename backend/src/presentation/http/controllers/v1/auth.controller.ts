import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
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
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import {
  LoginDto,
  MfaDisableDto,
  MfaEnrollmentConfirmDto,
  MfaEnrollmentTokenDto,
  MfaLoginDto,
  MfaVerifyEnrollDto,
  OAuthCallbackDto,
  RefreshDto,
} from '../../dto/v1/login.dto';
import { LOGIN_THROTTLE_OPTIONS } from '../../config/throttle-options';
import { JwtPayload, TokenPair } from '@shared/types/pagination';
import { LoginResult } from '@application/auth/dto/login-result';

@ApiTags('Auth v1')
@Controller({ path: 'auth', version: '1' })
export class AuthV1Controller {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyMfaLogin: VerifyMfaLoginUseCase,
    private readonly refreshUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly enrollMfa: EnrollMfaUseCase,
    private readonly confirmMfaEnroll: ConfirmMfaEnrollUseCase,
    private readonly disableMfa: DisableMfaUseCase,
    private readonly enrollMfaWithEnrollmentToken: EnrollMfaWithEnrollmentTokenUseCase,
    private readonly confirmMfaEnrollWithEnrollmentToken: ConfirmMfaEnrollWithEnrollmentTokenUseCase,
    private readonly getOAuthUrl: GetOAuthAuthorizationUrlUseCase,
    private readonly completeOAuth: CompleteOAuthLoginUseCase,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle(LOGIN_THROTTLE_OPTIONS)
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() dto: LoginDto): Promise<LoginResult> {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Public()
  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  @Throttle(LOGIN_THROTTLE_OPTIONS)
  @ApiOperation({ summary: 'Complete login with TOTP code' })
  async verifyMfa(@Body() dto: MfaLoginDto): Promise<TokenPair> {
    return this.verifyMfaLogin.execute(dto.mfaToken, dto.code);
  }

  @Public()
  @Post('mfa/enrollment/enroll')
  @HttpCode(HttpStatus.OK)
  @Throttle(LOGIN_THROTTLE_OPTIONS)
  @ApiOperation({ summary: 'Start MFA enrollment with enrollment token' })
  enrollmentEnroll(@Body() dto: MfaEnrollmentTokenDto) {
    return this.enrollMfaWithEnrollmentToken.execute(dto.enrollmentToken);
  }

  @Public()
  @Post('mfa/enrollment/confirm')
  @HttpCode(HttpStatus.OK)
  @Throttle(LOGIN_THROTTLE_OPTIONS)
  @ApiOperation({ summary: 'Confirm MFA enrollment and receive tokens' })
  enrollmentConfirm(@Body() dto: MfaEnrollmentConfirmDto): Promise<TokenPair> {
    return this.confirmMfaEnrollWithEnrollmentToken.execute(
      dto.enrollmentToken,
      dto.code,
    );
  }

  @Post('mfa/enroll')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Start MFA enrollment (returns QR URL)' })
  enroll(@CurrentUser() user: JwtPayload) {
    return this.enrollMfa.execute(user.sub);
  }

  @Post('mfa/enroll/confirm')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Confirm MFA enrollment with TOTP code' })
  async confirmEnroll(
    @CurrentUser() user: JwtPayload,
    @Body() dto: MfaVerifyEnrollDto,
  ): Promise<void> {
    await this.confirmMfaEnroll.execute(user.sub, dto.code);
  }

  @Post('mfa/disable')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Disable MFA for current user' })
  async disable(
    @CurrentUser() user: JwtPayload,
    @Body() dto: MfaDisableDto,
  ): Promise<void> {
    await this.disableMfa.execute(user.sub, dto.code);
  }

  @Public()
  @Get('oauth/authorize')
  @ApiOperation({ summary: 'Get OIDC authorization URL' })
  oauthAuthorize(@Query('state') state: string) {
    return this.getOAuthUrl.execute(state ?? crypto.randomUUID());
  }

  @Public()
  @Post('oauth/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete OIDC login' })
  oauthCallback(@Body() dto: OAuthCallbackDto): Promise<LoginResult> {
    return this.completeOAuth.execute(dto.callbackUrl);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Rotate refresh token' })
  async refresh(@Body() dto: RefreshDto): Promise<TokenPair> {
    return this.refreshUseCase.execute(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout and revoke tokens' })
  async logout(@Req() req: Request, @Body() dto: RefreshDto): Promise<void> {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : undefined;
    await this.logoutUseCase.execute(accessToken, dto.refreshToken);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Current user profile' })
  async me(@CurrentUser() user: JwtPayload): Promise<unknown> {
    return this.getUserUseCase.execute(user.sub);
  }
}
