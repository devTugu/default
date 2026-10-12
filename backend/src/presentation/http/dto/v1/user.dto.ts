import {
  CreateUserInputSchema,
  UpdateUserInputSchema,
} from '@default/types/user';
import { ListQuerySchema } from '@default/types/common';
import { createZodDto } from 'nestjs-zod';

export class CreateUserDto extends createZodDto(
  CreateUserInputSchema.strict(),
) {}

export class UpdateUserDto extends createZodDto(
  UpdateUserInputSchema.strict(),
) {}

export class ListUsersQueryDto extends createZodDto(ListQuerySchema) {}
