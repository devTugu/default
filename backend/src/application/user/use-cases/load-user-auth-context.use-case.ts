import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import {
  IPermissionCache,
  UserAuthContext,
} from '@application/ports/permission-cache.port';
import { USER_REPOSITORY, PERMISSION_CACHE } from '@shared/constants/tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoadUserAuthContextUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
    private readonly config: ConfigService,
  ) {}

  async execute(userId: number): Promise<UserAuthContext | null> {
    const cached = await this.cache.get(userId);
    if (cached) return cached;

    const user = await this.users.findById(userId);
    if (!user || !user.isActive) return null;

    const context: UserAuthContext = {
      roleNames: user.roleNames,
      permissionCodes: user.permissionCodes,
    };
    const ttl = this.config.get<number>('PERMISSION_CACHE_TTL_SEC', 60);
    await this.cache.set(userId, context, ttl);
    return context;
  }
}
