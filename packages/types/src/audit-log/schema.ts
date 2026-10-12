import { z } from "zod";
import { emptyToUndefined, ListQuerySchema } from "../common/schema";

export const AuditLogOutputSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable(),
  ipAddress: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.string(),
});

export const ListAuditLogsQuerySchema = ListQuerySchema.extend({
  userId: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().optional(),
  ),
  resource: z.preprocess(emptyToUndefined, z.string().optional()),
  action: z.preprocess(emptyToUndefined, z.string().optional()),
  from: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: "Invalid date string",
      })
      .optional(),
  ),
  to: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: "Invalid date string",
      })
      .optional(),
  ),
});

/** @deprecated Use ListAuditLogsQuerySchema */
export const ListAuditLogsParamsSchema = ListAuditLogsQuerySchema;

export type AuditLogOutput = z.infer<typeof AuditLogOutputSchema>;
export type ListAuditLogsParams = z.input<typeof ListAuditLogsQuerySchema>;
export type ListAuditLogsQuery = z.output<typeof ListAuditLogsQuerySchema>;
