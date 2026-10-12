import { z } from "zod";

export const PermissionSchema = z.object({
  id: z.number(),
  code: z.string(),
  description: z.string().nullable(),
});

export const CreatePermissionInputSchema = z.object({
  code: z.string(),
  description: z.string().optional(),
});

export const UpdatePermissionInputSchema = z.object({
  description: z.string().optional(),
});

export type Permission = z.infer<typeof PermissionSchema>;
export type CreatePermissionInput = z.infer<typeof CreatePermissionInputSchema>;
export type UpdatePermissionInput = z.infer<typeof UpdatePermissionInputSchema>;
