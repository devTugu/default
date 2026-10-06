'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { SiteSettingsOutput } from '../types/site-settings';

export const siteSettingsKeys = {
  all: ['site-settings'] as const,
  detail: () => [...siteSettingsKeys.all, 'detail'] as const,
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: siteSettingsKeys.detail(),
    queryFn: () => api.get<SiteSettingsOutput>(API_ENDPOINTS.SITE_SETTINGS.GET),
  });
};
