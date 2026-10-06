import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '@domain/authorization/repositories/role.repository.interface';
import { AppErrors } from '@application/exceptions/application.exception';
import { ROLE_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roles: IRoleRepository,
  ) {}

  async execute(input: {
    name: string;
    description?: string;
    permissionIds?: number[];
  }) {
    const name = input.name.toUpperCase();
    if (await this.roles.nameExists(name)) {
      throw AppErrors.CONFLICT('Role name already exists.');
    }
    return this.roles.create({
      name,
      description: input.description,
      permissionIds: input.permissionIds,
    });
  }
}
