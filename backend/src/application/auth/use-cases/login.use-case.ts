import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IPasswordHasher } from '@application/ports/password-hasher.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import { LoginResult } from '../dto/login-result';
import { roleRequiresMfa } from '../lib/mfa-required-roles';
import { MfaPolicyService } from '../services/mfa-policy.service';
import {
  USER_REPOSITORY,
  PASSWORD_HASHER,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';
import type { ClientRequestMeta } from '../dto/client-request-meta';
import { RecordRefreshTokenService } from '../services/record-refresh-token.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    private readonly recordRefresh: RecordRefreshTokenService,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    private readonly config: ConfigService,
    private readonly mfaPolicy: MfaPolicyService,
  ) {}

  async execute(
    email: string,
    password: string,
    meta?: ClientRequestMeta,
  ): Promise<LoginResult> {
    const lockState = await this.users.getLoginLockState(email);
    if (!lockState || !lockState.passwordHash) {
      throw AppErrors.UNAUTHORIZED('Invalid email or password.');
    }

    if (lockState.lockedUntil && lockState.lockedUntil.getTime() > Date.now()) {
      throw AppErrors.TOO_MANY_REQUESTS(
        'Account temporarily locked due to too many failed login attempts.',
      );
    }

    const valid = await this.hasher.compare(password, lockState.passwordHash);
    if (!valid) {
      const maxAttempts = this.config.get<number>(
        'LOGIN_MAX_FAILED_ATTEMPTS',
        5,
      );
      const lockoutMinutes = this.config.get<number>(
        'LOGIN_LOCKOUT_MINUTES',
        15,
      );
      const nextAttempts = lockState.failedLoginAttempts + 1;
      const lockedUntil =
        nextAttempts >= maxAttempts
          ? new Date(Date.now() + lockoutMinutes * 60_000)
          : undefined;
      await this.users.recordFailedLogin(lockState.userId, lockedUntil);
      throw AppErrors.UNAUTHORIZED('Invalid email or password.');
    }

    await this.users.clearFailedLogin(lockState.userId);

    const user = await this.users.findByEmailWithRolesAndPermissions(email);
    if (!user || !user.passwordHash) {
      throw AppErrors.UNAUTHORIZED('Invalid email or password.');
    }

    const requiredRoles = await this.mfaPolicy.getRequiredRoles();
    const privilegedRole = roleRequiresMfa(user.roleNames, requiredRoles);

    if (user.mfaEnabled) {
      const mfaToken = await this.tokens.issueMfaPendingToken(user.id);
      return { requiresMfa: true, mfaToken };
    }

    if (privilegedRole) {
      const enrollmentToken = await this.tokens.issueMfaEnrollmentPendingToken(
        user.id,
      );
      return { requiresMfaEnrollment: true, enrollmentToken };
    }

    await this.warmPermissionCache(
      user.id,
      user.roleNames,
      user.permissionCodes,
    );
    return this.issueTokens(user.id, user.email, meta);
  }

  private async warmPermissionCache(
    userId: number,
    roleNames: string[],
    permissionCodes: string[],
  ): Promise<void> {
    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.permissionCache.set(userId, { roleNames, permissionCodes }, ttl);
  }

  private async issueTokens(
    userId: number,
    email: string,
    meta?: ClientRequestMeta,
  ): Promise<TokenPair> {
    const issued = await this.tokens.issuePair(userId, email);
    await this.recordRefresh.record(
      userId,
      issued.refreshToken,
      issued.refreshExpiresAt,
      meta,
    );
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
