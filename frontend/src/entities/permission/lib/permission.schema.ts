import { z } from 'zod';

export const createPermissionSchema = z.object({
  code: z
    .string()
    .min(2)
    .transform((v) => v.toUpperCase().replace(/\s+/g, '_')),
  description: z.string().optional(),
});

export const updatePermissionSchema = z.object({
  description: z.string().optional(),
});

export type CreatePermissionFormValues = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionFormValues = z.infer<typeof updatePermissionSchema>;
