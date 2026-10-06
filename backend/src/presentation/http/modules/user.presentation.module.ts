import { Module } from '@nestjs/common';
import { UserV1Controller } from '../controllers/v1/user.controller';
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case';
import { ListUsersUseCase } from '@application/user/use-cases/list-users.use-case';
import { GetUserUseCase } from '@application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '@application/user/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@application/user/use-cases/delete-user.use-case';
import {
  AnonymizeUserUseCase,
  ExportUserDataUseCase,
} from '@application/user/use-cases/gdpr.use-cases';

@Module({
  controllers: [UserV1Controller],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ExportUserDataUseCase,
    AnonymizeUserUseCase,
  ],
})
export class UserPresentationModule {}
