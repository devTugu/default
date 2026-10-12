import {
  DashboardStatsOutputSchema,
  type DashboardStats,
} from "@default/types/dashboard";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";

export async function getDashboardStats(): Promise<DashboardStats> {
  const data = await getApi().get(API_ENDPOINTS.DASHBOARD.STATS);
  return parseWith(
    DashboardStatsOutputSchema,
    API_ENDPOINTS.DASHBOARD.STATS,
  )(data);
}
