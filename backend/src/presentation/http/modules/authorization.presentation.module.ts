import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { RoleV1Controller } from '../controllers/v1/role.controller';
import { PermissionV1Controller } from '../controllers/v1/permission.controller';
import { HealthV1Controller } from '../controllers/v1/health.controller';
import { CreateRoleUseCase } from '@application/authorization/use-cases/create-role.use-case';
import {
  AssignRoleToUserUseCase,
  DeleteRoleUseCase,
  GetRoleUseCase,
  ListRolesUseCase,
  RemoveRoleFromUserUseCase,
  UpdateRoleUseCase,
} from '@application/authorization/use-cases/role-crud.use-cases';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  GetPermissionUseCase,
  ListPermissionsUseCase,
  UpdatePermissionUseCase,
} from '@application/authorization/use-cases/permission-crud.use-cases';
import { LoadUserAuthContextUseCase } from '@application/user/use-cases/load-user-auth-context.use-case';

@Module({
  imports: [TerminusModule],
  controllers: [RoleV1Controller, PermissionV1Controller, HealthV1Controller],
  providers: [
    CreateRoleUseCase,
    ListRolesUseCase,
    GetRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    AssignRoleToUserUseCase,
    RemoveRoleFromUserUseCase,
    CreatePermissionUseCase,
    ListPermissionsUseCase,
    GetPermissionUseCase,
    UpdatePermissionUseCase,
    DeletePermissionUseCase,
    LoadUserAuthContextUseCase,
  ],
})
export class AuthorizationPresentationModule {}
