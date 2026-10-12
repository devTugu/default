import type { ZodType } from "zod";

export function parseWith<T>(schema: ZodType<T>, endpoint: string) {
  return (data: unknown): T => {
    try {
      return schema.parse(data);
    } catch (cause) {
      throw new Error(`API contract mismatch: ${endpoint}`, { cause });
    }
  };
}
