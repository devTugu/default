import {
  MfaEnrollmentResponseSchema,
  type MfaEnrollmentResponse,
} from "@default/types/auth";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";

export async function enrollMfa(): Promise<MfaEnrollmentResponse> {
  const data = await getApi().post(API_ENDPOINTS.AUTH.MFA_ENROLL);
  return parseWith(MfaEnrollmentResponseSchema, API_ENDPOINTS.AUTH.MFA_ENROLL)(
    data,
  );
}

export function confirmMfaEnroll(code: string): Promise<void> {
  return getApi().post(API_ENDPOINTS.AUTH.MFA_ENROLL_CONFIRM, { code });
}

export function disableMfa(code: string): Promise<void> {
  return getApi().post(API_ENDPOINTS.AUTH.MFA_DISABLE, { code });
}
