'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type {
  SiteSettingsOutput,
  UpdateSiteSettingsInput,
} from '../types/site-settings';
import { siteSettingsKeys } from './queries';

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSiteSettingsInput) =>
      api.patch<SiteSettingsOutput>(API_ENDPOINTS.SITE_SETTINGS.PATCH, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteSettingsKeys.all });
    },
  });
};
