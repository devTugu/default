import { cache } from 'react';
import { normalizeSiteSettings } from '@/entities/site-settings/lib/normalize-site-settings';
import type { SiteSettingsOutput } from '@/entities/site-settings';
import { fetchInternal, parseInternalJson } from '@/shared/lib/internal-api';
import { PUBLIC_API_PATHS, PUBLIC_REVALIDATE_SECONDS } from '@/shared/api/public.config';

async function fetchPublic<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetchInternal(path, {
      ...init,
      next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const envelope = await parseInternalJson<T>(response);
    return envelope.data;
  } catch {
    return null;
  }
}

export const getPublicSiteSettings = cache(async (): Promise<SiteSettingsOutput | null> => {
  const raw = await fetchPublic<SiteSettingsOutput>(PUBLIC_API_PATHS.SITE_SETTINGS);
  return normalizeSiteSettings(raw);
});
