import { z } from "zod";

export const DashboardStatsOutputSchema = z.object({
  users: z.number().optional(),
  roles: z.number().optional(),
  permissions: z.number().optional(),
});

export type DashboardStatsOutput = z.infer<typeof DashboardStatsOutputSchema>;
export type DashboardStats = DashboardStatsOutput;
