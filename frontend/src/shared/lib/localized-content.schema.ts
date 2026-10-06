import { z } from 'zod';

/** EN required; MN optional (empty falls back to EN via pickLocalized). */
export const localizedTextSchema = z.object({
  en: z.string().min(1),
  mn: z.string(),
});

/** Both locales required (rare — e.g. navigation labels when both must ship). */
export const localizedTextRequiredSchema = z.object({
  en: z.string().min(1),
  mn: z.string().min(1),
});

export const localizedTextOptionalSchema = z.object({
  en: z.string(),
  mn: z.string(),
});

export const localizedStringListSchema = z.object({
  en: z.array(z.string()),
  mn: z.array(z.string()),
});

export type LocalizedTextFormValues = z.infer<typeof localizedTextSchema>;
export type LocalizedStringListFormValues = z.infer<
  typeof localizedStringListSchema
>;
