import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { User } from '@domain/user/entities/user.entity';
import { IRefreshTokenRepository } from '@domain/auth/repositories/refresh-token.repository.interface';
import { IAuditLogRepository } from '@application/ports/audit-log.port';
import { AppErrors } from '@application/exceptions/application.exception';
import {
  USER_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  AUDIT_LOG_REPOSITORY,
} from '@shared/constants/tokens';

const SENSITIVE_METADATA_KEY =
  /password|secret|token|authorization|cookie|mfa/i;

function sanitizeMetadata(
  metadata: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (!metadata) return null;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (SENSITIVE_METADATA_KEY.test(key)) continue;
    sanitized[key] = value;
  }
  return sanitized;
}

@Injectable()
export class ExportUserDataUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(AUDIT_LOG_REPOSITORY)
    private readonly auditLogs: IAuditLogRepository,
  ) {}

  async execute(id: number): Promise<Record<string, unknown>> {
    const user = await this.users.findById(id);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    const { items: auditEvents } = await this.auditLogs.findAll({
      userId: id,
      page: 1,
      limit: 100,
    });

    return {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
        roleNames: user.roleNames,
        permissionCodes: user.permissionCodes,
        mfaEnabled: user.mfaEnabled,
        oauthProvider: user.oauthProvider,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      oauth: {
        provider: user.oauthProvider,
        linked: Boolean(user.oauthProvider),
      },
      auditEvents: auditEvents.map((entry) => ({
        id: entry.id,
        action: entry.action,
        resource: entry.resource,
        resourceId: entry.resourceId,
        createdAt: entry.createdAt.toISOString(),
        metadata: sanitizeMetadata(entry.metadata),
      })),
    };
  }
}

@Injectable()
export class AnonymizeUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokens: IRefreshTokenRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const user = await this.users.findById(id);
    if (!user) throw AppErrors.NOT_FOUND('User not found.');

    try {
      User.assertCanAnonymize(user);
    } catch {
      throw AppErrors.CONFLICT('User is already anonymized.');
    }

    await this.users.anonymize(id);
    await this.refreshTokens.revokeAllForUser(id);
  }
}
