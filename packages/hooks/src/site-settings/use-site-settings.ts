"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSiteSettings,
  siteSettingsKeys,
  updateSiteSettings,
} from "@default/api";
import type { UpdateSiteSettingsInput } from "@default/types/site-settings";

export { siteSettingsKeys };

export const useSiteSettings = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: siteSettingsKeys.detail(),
    queryFn: () => getSiteSettings(),
    enabled: options?.enabled ?? true,
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSiteSettingsInput) => updateSiteSettings(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: siteSettingsKeys.all });
    },
  });
};
