import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { IPasswordHasher } from '@application/ports/password-hasher.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import { LoginResult } from '../dto/login-result';
import {
  parseMfaRequiredRoles,
  roleRequiresMfa,
} from '../lib/mfa-required-roles';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  PASSWORD_HASHER,
  TOKEN_ISSUER,
  PERMISSION_CACHE,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    private readonly config: ConfigService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
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

    const requiredRoles = parseMfaRequiredRoles(
      this.config.get<string>('MFA_REQUIRED_ROLES'),
    );
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
    return this.issueTokens(user.id, user.email);
  }

  private async warmPermissionCache(
    userId: number,
    roleNames: string[],
    permissionCodes: string[],
  ): Promise<void> {
    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.permissionCache.set(userId, { roleNames, permissionCodes }, ttl);
  }

  private async issueTokens(userId: number, email: string): Promise<TokenPair> {
    const issued = await this.tokens.issuePair(userId, email);
    const tokenHash = crypto
      .createHash('sha256')
      .update(issued.refreshToken)
      .digest('hex');
    await this.refreshTokens.save(userId, tokenHash, issued.refreshExpiresAt);
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
