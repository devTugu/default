import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { IOAuthIdentityProvider } from '@application/ports/identity.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { IPasswordHasher } from '@application/ports/password-hasher.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { LoginResult } from '../dto/login-result';
import {
  parseMfaRequiredRoles,
  roleRequiresMfa,
} from '../lib/mfa-required-roles';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  OAUTH_IDENTITY,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
  PASSWORD_HASHER,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetOAuthAuthorizationUrlUseCase {
  constructor(
    @Inject(OAUTH_IDENTITY) private readonly oauth: IOAuthIdentityProvider,
  ) {}

  async execute(state: string): Promise<{ url: string }> {
    if (!this.oauth.isEnabled()) {
      throw AppErrors.BAD_REQUEST('OAuth is not enabled.');
    }
    const url = await this.oauth.getAuthorizationUrl(state);
    return { url };
  }
}

@Injectable()
export class CompleteOAuthLoginUseCase {
  constructor(
    @Inject(OAUTH_IDENTITY) private readonly oauth: IOAuthIdentityProvider,
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    private readonly config: ConfigService,
  ) {}

  async execute(callbackUrl: string): Promise<LoginResult> {
    if (!this.oauth.isEnabled()) {
      throw AppErrors.BAD_REQUEST('OAuth is not enabled.');
    }

    const profile = await this.oauth.exchangeCode(callbackUrl);
    let user =
      (await this.users.findByOAuth(profile.provider, profile.subject)) ??
      (await this.users.findByEmail(profile.email));

    if (!user) {
      user = await this.users.create({
        email: profile.email,
        passwordHash: await this.hasher.hash(crypto.randomUUID()),
        isActive: true,
        oauthProvider: profile.provider,
        oauthSubject: profile.subject,
      });
    } else if (!user.oauthProvider) {
      user = await this.users.update(user.id, {
        oauthProvider: profile.provider,
        oauthSubject: profile.subject,
      });
    }

    const authUser = await this.users.findByEmailWithRolesAndPermissions(
      user.email,
    );
    if (!authUser) throw AppErrors.UNAUTHORIZED('OAuth user inactive.');

    const requiredRoles = parseMfaRequiredRoles(
      this.config.get<string>('MFA_REQUIRED_ROLES'),
    );
    const privilegedRole = roleRequiresMfa(authUser.roleNames, requiredRoles);

    if (authUser.mfaEnabled) {
      const mfaToken = await this.tokens.issueMfaPendingToken(authUser.id);
      return { requiresMfa: true, mfaToken };
    }

    if (privilegedRole) {
      const enrollmentToken = await this.tokens.issueMfaEnrollmentPendingToken(
        authUser.id,
      );
      return { requiresMfaEnrollment: true, enrollmentToken };
    }

    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.permissionCache.set(
      authUser.id,
      {
        roleNames: authUser.roleNames,
        permissionCodes: authUser.permissionCodes,
      },
      ttl,
    );

    const issued = await this.tokens.issuePair(authUser.id, authUser.email);
    const tokenHash = crypto
      .createHash('sha256')
      .update(issued.refreshToken)
      .digest('hex');
    await this.refreshTokens.save(
      authUser.id,
      tokenHash,
      issued.refreshExpiresAt,
    );
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
