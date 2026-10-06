import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { IMfaVerifier } from '@application/ports/identity.port';
import { ITokenIssuer } from '@application/ports/token-issuer.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { TokenPair } from '@shared/types/pagination';
import {
  USER_REPOSITORY,
  MFA_VERIFIER,
  TOKEN_ISSUER,
  REFRESH_TOKEN_REPOSITORY,
  PERMISSION_CACHE,
} from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnrollMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number): Promise<{ otpauthUrl: string }> {
    const user = await this.users.findById(userId);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    const { secret, otpauthUrl } = this.mfa.generateSecret(user.email);
    await this.users.update(userId, {
      mfaSecretEncrypted: this.mfa.encryptSecret(secret),
      mfaEnabled: false,
    });

    return { otpauthUrl };
  }
}

@Injectable()
export class ConfirmMfaEnrollUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number, code: string): Promise<void> {
    const encrypted = await this.users.getMfaSecretEncrypted(userId);
    if (!encrypted) throw AppErrors.BAD_REQUEST('Start MFA enrollment first.');

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(userId, { mfaEnabled: true });
  }
}

@Injectable()
export class DisableMfaUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
  ) {}

  async execute(userId: number, code: string): Promise<void> {
    const encrypted = await this.users.getMfaSecretEncrypted(userId);
    if (!encrypted) {
      throw AppErrors.BAD_REQUEST('MFA is not enabled.');
    }

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(userId, {
      mfaEnabled: false,
      mfaSecretEncrypted: null,
    });
  }
}

@Injectable()
export class EnrollMfaWithEnrollmentTokenUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
  ) {}

  async execute(enrollmentToken: string): Promise<{ otpauthUrl: string }> {
    const claims =
      await this.tokens.verifyMfaEnrollmentPending(enrollmentToken);
    const user = await this.users.findById(claims.sub);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    const { secret, otpauthUrl } = this.mfa.generateSecret(user.email);
    await this.users.update(claims.sub, {
      mfaSecretEncrypted: this.mfa.encryptSecret(secret),
      mfaEnabled: false,
    });

    return { otpauthUrl };
  }
}

@Injectable()
export class ConfirmMfaEnrollWithEnrollmentTokenUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(MFA_VERIFIER) private readonly mfa: IMfaVerifier,
    @Inject(TOKEN_ISSUER) private readonly tokens: ITokenIssuer,
    @Inject(PERMISSION_CACHE)
    private readonly permissionCache: IPermissionCache,
    private readonly config: ConfigService,
  ) {}

  async execute(enrollmentToken: string, code: string): Promise<TokenPair> {
    const claims =
      await this.tokens.verifyMfaEnrollmentPending(enrollmentToken);
    const encrypted = await this.users.getMfaSecretEncrypted(claims.sub);
    if (!encrypted) {
      throw AppErrors.BAD_REQUEST('Start MFA enrollment first.');
    }

    const secret = this.mfa.decryptSecret(encrypted);
    if (!this.mfa.verifyToken(secret, code)) {
      throw AppErrors.UNAUTHORIZED('Invalid MFA code.');
    }

    await this.users.update(claims.sub, { mfaEnabled: true });

    const user = await this.users.findByEmailWithRolesAndPermissions(
      (await this.users.findById(claims.sub))!.email,
    );
    if (!user) throw AppErrors.UNAUTHORIZED('User not found.');

    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.permissionCache.set(
      user.id,
      { roleNames: user.roleNames, permissionCodes: user.permissionCodes },
      ttl,
    );

    const issued = await this.tokens.issuePair(user.id, user.email);
    const tokenHash = crypto
      .createHash('sha256')
      .update(issued.refreshToken)
      .digest('hex');
    await this.refreshTokens.save(user.id, tokenHash, issued.refreshExpiresAt);
    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
      expiresIn: issued.accessExpiresIn,
    };
  }
}
