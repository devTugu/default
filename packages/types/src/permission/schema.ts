import { z } from "zod";

export const CreatePermissionSchema = z.object({
  code: z
    .string()
    .min(2)
    .transform((v) => v.toUpperCase().replace(/\s+/g, "_")),
  description: z.string().optional(),
});

export const UpdatePermissionSchema = z.object({
  description: z.string().optional(),
});

export type CreatePermissionFormValues = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionFormValues = z.infer<typeof UpdatePermissionSchema>;
