import {
  SiteSettingsOutputSchema,
  type SiteSettingsOutput,
  type UpdateSiteSettingsInput,
} from "@default/types/site-settings";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";

export async function getSiteSettings(): Promise<SiteSettingsOutput> {
  const data = await getApi().get(API_ENDPOINTS.SITE_SETTINGS.GET);
  return parseWith(
    SiteSettingsOutputSchema,
    API_ENDPOINTS.SITE_SETTINGS.GET,
  )(data);
}

export async function updateSiteSettings(
  data: UpdateSiteSettingsInput,
): Promise<SiteSettingsOutput> {
  const result = await getApi().patch(API_ENDPOINTS.SITE_SETTINGS.PATCH, data);
  return parseWith(
    SiteSettingsOutputSchema,
    API_ENDPOINTS.SITE_SETTINGS.PATCH,
  )(result);
}
