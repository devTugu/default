import {
  AssignRoleInputSchema,
  CreateRoleInputSchema,
  UpdateRoleInputSchema,
} from '@default/types/role';
import {
  CreatePermissionInputSchema,
  UpdatePermissionInputSchema,
} from '@default/types/permission';
import { ListQuerySchema } from '@default/types/common';
import { createZodDto } from 'nestjs-zod';

export class ListQueryDto extends createZodDto(
  ListQuerySchema.omit({ search: true }),
) {}

export class CreateRoleDto extends createZodDto(
  CreateRoleInputSchema.strict(),
) {}

export class UpdateRoleDto extends createZodDto(
  UpdateRoleInputSchema.strict(),
) {}

export class AssignRoleDto extends createZodDto(
  AssignRoleInputSchema.strict(),
) {}

export class CreatePermissionDto extends createZodDto(
  CreatePermissionInputSchema.strict(),
) {}

export class UpdatePermissionDto extends createZodDto(
  UpdatePermissionInputSchema.strict(),
) {}
