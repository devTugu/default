import { z } from "zod";

export const UploadMediaResultSchema = z.object({
  url: z.string(),
});

export type UploadMediaResult = z.infer<typeof UploadMediaResultSchema>;
