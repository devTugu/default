import {
  UploadMediaResultSchema,
  type UploadMediaResult,
} from "@default/types/media";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";

export async function uploadMedia(file: File): Promise<UploadMediaResult> {
  const form = new FormData();
  form.append("file", file);
  const data = await getApi().postForm(API_ENDPOINTS.MEDIA.UPLOAD, form);
  return parseWith(UploadMediaResultSchema, API_ENDPOINTS.MEDIA.UPLOAD)(data);
}
