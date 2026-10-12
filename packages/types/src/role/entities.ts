import { z } from "zod";

export const PermissionRefSchema = z.object({
  id: z.number(),
  code: z.string(),
  description: z.string().nullable(),
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(PermissionRefSchema),
});

export const CreateRoleInputSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  permissionIds: z.array(z.number().int()).optional(),
});

export const UpdateRoleInputSchema = z.object({
  description: z.string().optional(),
  permissionIds: z.array(z.number().int()).optional(),
});

export const AssignRoleInputSchema = z.object({
  userId: z.number().int(),
  roleId: z.number().int(),
});

export type PermissionRef = z.infer<typeof PermissionRefSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type CreateRoleInput = z.infer<typeof CreateRoleInputSchema>;
export type UpdateRoleInput = z.infer<typeof UpdateRoleInputSchema>;
export type AssignRoleInput = z.infer<typeof AssignRoleInputSchema>;
