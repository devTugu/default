import { Inject, Injectable } from '@nestjs/common';
import { Email } from '@domain/value-objects/email.vo';
import { PasswordPolicy } from '@domain/user/value-objects/password-policy.vo';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { IPasswordHasher } from '@application/ports/password-hasher.port';
import { AppErrors } from '@application/exceptions/application.exception';
import { UserOutput } from '@application/dto/user.dto';
import { toUserOutput } from '@application/dto/user-output.mapper';
import { USER_REPOSITORY, PASSWORD_HASHER } from '@shared/constants/tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
  ) {}

  async execute(input: {
    email: string;
    password: string;
    isActive?: boolean;
  }): Promise<UserOutput> {
    try {
      PasswordPolicy.validate(input.password);
    } catch (error) {
      throw AppErrors.BAD_REQUEST(
        error instanceof Error ? error.message : 'Invalid password.',
      );
    }

    const email = Email.create(input.email);
    if (await this.users.emailExists(email.value)) {
      throw AppErrors.CONFLICT('Email is already registered.');
    }
    const passwordHash = await this.hasher.hash(input.password);
    const user = await this.users.create({
      email: email.value,
      passwordHash,
      isActive: input.isActive ?? true,
    });
    return toUserOutput(user);
  }
}
