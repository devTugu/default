"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardKeys, getDashboardStats } from "@default/api";

export { dashboardKeys };

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => getDashboardStats(),
    staleTime: 30_000,
  });
};
