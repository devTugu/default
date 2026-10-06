import { z } from 'zod';
import type { ValidationMessages } from '@/shared/i18n/validation-messages';

type RoleValidationMessages = Pick<ValidationMessages, 'nameMinLength'>;

export function createRoleSchema(v: RoleValidationMessages) {
  return z.object({
    name: z.string().min(2, v.nameMinLength),
    description: z.string().optional(),
    permissionIds: z.array(z.number()),
  });
}

export function updateRoleSchema() {
  return z.object({
    description: z.string().optional(),
    permissionIds: z.array(z.number()),
  });
}

export const assignRoleSchema = z.object({
  userId: z.number().min(1),
  roleId: z.number().min(1),
});

export type CreateRoleFormValues = z.infer<
  ReturnType<typeof createRoleSchema>
>;
export type UpdateRoleFormValues = z.infer<
  ReturnType<typeof updateRoleSchema>
>;
export type AssignRoleFormValues = z.infer<typeof assignRoleSchema>;
