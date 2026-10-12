import { z } from "zod";

export type RoleFormMessages = {
  nameMinLength: string;
};

export function createRoleSchema(v: RoleFormMessages) {
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

export const AssignRoleSchema = z.object({
  userId: z.number().min(1),
  roleId: z.number().min(1),
});

export type CreateRoleFormValues = z.infer<ReturnType<typeof createRoleSchema>>;
export type UpdateRoleFormValues = z.infer<ReturnType<typeof updateRoleSchema>>;
export type AssignRoleFormValues = z.infer<typeof AssignRoleSchema>;
