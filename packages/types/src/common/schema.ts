import { z } from "zod";
import { ComplexPasswordSchema } from "./password";

/** EN required; MN optional (empty falls back to EN via pickLocalized). */
export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  mn: z.string(),
});

export const LocalizedTextRequiredSchema = z.object({
  en: z.string().min(1),
  mn: z.string().min(1),
});

export const LocalizedTextOptionalSchema = z.object({
  en: z.string(),
  mn: z.string(),
});

export const LocalizedStringListSchema = z.object({
  en: z.array(z.string()),
  mn: z.array(z.string()),
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;
export type LocalizedStringList = z.infer<typeof LocalizedStringListSchema>;

export const UserOutputSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  mfaEnabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  roles: z.array(z.string()),
  permissionCodes: z.array(z.string()),
});

export type UserOutput = z.infer<typeof UserOutputSchema>;

export const CreateUserInputSchema = z.object({
  email: z.string().email(),
  password: ComplexPasswordSchema,
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

export const UpdateUserInputSchema = z.object({
  password: ComplexPasswordSchema.optional(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;

/** Query/string empties become undefined before coerce ("" → 0 otherwise). */
export function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === null) return undefined;
  return value;
}

export const ListQuerySchema = z.object({
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).max(100).default(20),
  ),
  search: z.preprocess(emptyToUndefined, z.string().optional()),
});

export type ListQueryParams = z.input<typeof ListQuerySchema>;
export type ListQuery = z.output<typeof ListQuerySchema>;

export function PaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  });
}

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
