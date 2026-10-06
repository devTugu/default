import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IPasswordHasher } from '@application/ports/password-hasher.port';
import { IPermissionCache } from '@application/ports/permission-cache.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { UserOutput } from '@application/dto/user.dto';
import { toUserOutput } from '@application/dto/user-output.mapper';
import {
  USER_REPOSITORY,
  PASSWORD_HASHER,
  PERMISSION_CACHE,
} from '@shared/constants/tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    @Inject(PERMISSION_CACHE) private readonly cache: IPermissionCache,
  ) {}

  async execute(
    id: number,
    input: { password?: string; isActive?: boolean },
  ): Promise<UserOutput> {
    const existing = await this.users.findById(id);
    if (!existing) throw AppErrors.NOT_FOUND('User not found.');
    const passwordHash = input.password
      ? await this.hasher.hash(input.password)
      : undefined;
    const user = await this.users.update(id, {
      passwordHash,
      isActive: input.isActive,
    });
    if (input.isActive !== undefined || input.password !== undefined) {
      await this.cache.invalidate(id);
    }
    return toUserOutput(user);
  }
}
