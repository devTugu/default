import { Inject, Injectable } from '@nestjs/common';
import { and, count, desc, eq, isNull, like, sql } from 'drizzle-orm';
import {
  CreateUserData,
  IUserRepository,
  ListUsersQuery,
  LoginLockState,
  UpdateUserData,
} from '@domain/user/repositories/user.repository.interface';
import { User as DomainUser } from '@domain/user/entities/user.entity';
import { IOrganizationContext } from '@application/ports/organization-context.port';
import { PaginatedResult } from '@shared/types/pagination';
import { ORGANIZATION_CONTEXT } from '@shared/constants/tokens';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { userRoles, users } from '../database/drizzle/schema';
import { UserMapper } from '../database/drizzle/mappers/user.mapper';

const userWithAuth = {
  userRoles: {
    with: {
      role: {
        with: {
          rolePermissions: {
            with: { permission: true },
          },
        },
      },
    },
  },
} as const;

@Injectable()
export class UserDrizzleRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDatabase,
    @Inject(ORGANIZATION_CONTEXT)
    private readonly orgContext: IOrganizationContext,
  ) {}

  async create(data: CreateUserData): Promise<DomainUser> {
    const organizationId =
      data.organizationId ?? (await this.orgContext.getCurrentOrganizationId());
    const [result] = await this.db.insert(users).values({
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      isActive: data.isActive,
      organizationId: organizationId ?? null,
      oauthProvider: data.oauthProvider ?? null,
      oauthSubject: data.oauthSubject ?? null,
    });
    const created = await this.findById(Number(result.insertId));
    if (!created) throw new Error('USER_CREATE_FAILED');
    return created;
  }

  async findById(id: number): Promise<DomainUser | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(eq(users.id, id), isNull(users.deletedAt)),
      with: userWithAuth,
    });
    return entity ? UserMapper.toDomain(entity, true) : null;
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(eq(users.email, email.toLowerCase()), isNull(users.deletedAt)),
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmailWithRolesAndPermissions(
    email: string,
  ): Promise<DomainUser | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(
        eq(users.email, email.toLowerCase()),
        eq(users.isActive, true),
        isNull(users.deletedAt),
      ),
      with: userWithAuth,
    });
    return entity ? UserMapper.toDomain(entity, true) : null;
  }

  async findActiveById(id: number): Promise<DomainUser | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(
        eq(users.id, id),
        eq(users.isActive, true),
        isNull(users.deletedAt),
      ),
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAll(query: ListUsersQuery): Promise<PaginatedResult<DomainUser>> {
    const { page = 1, limit = 20, search } = query;
    const whereClause = search
      ? and(isNull(users.deletedAt), like(users.email, `%${search}%`))
      : isNull(users.deletedAt);

    const [items, totalRow] = await Promise.all([
      this.db.query.users.findMany({
        where: whereClause,
        with: userWithAuth,
        orderBy: desc(users.createdAt),
        limit,
        offset: (page - 1) * limit,
      }),
      this.db.select({ value: count() }).from(users).where(whereClause),
    ]);

    const total = totalRow[0]?.value ?? 0;
    return {
      items: items.map((u) => UserMapper.toDomain(u, true)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: number, data: UpdateUserData): Promise<DomainUser> {
    const patch: Partial<typeof users.$inferInsert> = {};
    if (data.passwordHash) patch.passwordHash = data.passwordHash;
    if (data.isActive !== undefined) patch.isActive = data.isActive;
    if (data.mfaEnabled !== undefined) patch.mfaEnabled = data.mfaEnabled;
    if (data.mfaSecretEncrypted !== undefined) {
      patch.mfaSecretEncrypted = data.mfaSecretEncrypted;
    }
    if (data.oauthProvider !== undefined)
      patch.oauthProvider = data.oauthProvider;
    if (data.oauthSubject !== undefined) patch.oauthSubject = data.oauthSubject;
    if (data.email) patch.email = data.email.toLowerCase();

    await this.db
      .update(users)
      .set(patch)
      .where(and(eq(users.id, id), isNull(users.deletedAt)));

    const updated = await this.findById(id);
    if (!updated) throw new Error('USER_NOT_FOUND');
    return updated;
  }

  async findByOAuth(
    provider: string,
    subject: string,
  ): Promise<DomainUser | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(
        eq(users.oauthProvider, provider),
        eq(users.oauthSubject, subject),
        isNull(users.deletedAt),
      ),
      with: userWithAuth,
    });
    return entity ? UserMapper.toDomain(entity, true) : null;
  }

  async getMfaSecretEncrypted(id: number): Promise<string | null> {
    const rows = await this.db
      .select({ mfaSecretEncrypted: users.mfaSecretEncrypted })
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)))
      .limit(1);
    return rows[0]?.mfaSecretEncrypted ?? null;
  }

  async getLoginLockState(email: string): Promise<LoginLockState | null> {
    const entity = await this.db.query.users.findFirst({
      where: and(
        eq(users.email, email.toLowerCase()),
        eq(users.isActive, true),
        isNull(users.deletedAt),
      ),
      columns: {
        id: true,
        passwordHash: true,
        lockedUntil: true,
        failedLoginAttempts: true,
      },
    });
    if (!entity) return null;
    return {
      userId: entity.id,
      passwordHash: entity.passwordHash,
      lockedUntil: entity.lockedUntil,
      failedLoginAttempts: entity.failedLoginAttempts,
    };
  }

  async recordFailedLogin(id: number, lockedUntil?: Date): Promise<number> {
    await this.db
      .update(users)
      .set({
        failedLoginAttempts: sql`${users.failedLoginAttempts} + 1`,
        ...(lockedUntil !== undefined ? { lockedUntil } : {}),
      })
      .where(eq(users.id, id));

    const rows = await this.db
      .select({ failedLoginAttempts: users.failedLoginAttempts })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return rows[0]?.failedLoginAttempts ?? 0;
  }

  async clearFailedLogin(id: number): Promise<void> {
    await this.db
      .update(users)
      .set({ failedLoginAttempts: 0, lockedUntil: null })
      .where(eq(users.id, id));
  }

  async anonymize(id: number): Promise<void> {
    await this.db.delete(userRoles).where(eq(userRoles.userId, id));
    await this.db
      .update(users)
      .set({
        email: `deleted-${id}@anonymized.local`,
        passwordHash: null,
        isActive: false,
        oauthProvider: null,
        oauthSubject: null,
        mfaEnabled: false,
        mfaSecretEncrypted: null,
        failedLoginAttempts: 0,
        lockedUntil: null,
      })
      .where(eq(users.id, id));
    await this.softDelete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, id));
  }

  async emailExists(email: string): Promise<boolean> {
    const rows = await this.db
      .select({ value: count() })
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    return (rows[0]?.value ?? 0) > 0;
  }
}
