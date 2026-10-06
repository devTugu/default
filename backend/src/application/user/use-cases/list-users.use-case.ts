import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { UserOutput } from '@application/dto/user.dto';
import { toUserOutput } from '@application/dto/user-output.mapper';
import { PaginatedResult } from '@shared/types/pagination';
import { USER_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
  ) {}

  async execute(query: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResult<UserOutput>> {
    const result = await this.users.findAll(query);
    return {
      ...result,
      items: result.items.map((u) => toUserOutput(u)),
    };
  }
}
