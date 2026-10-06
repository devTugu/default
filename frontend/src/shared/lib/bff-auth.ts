import type {
  ApiEnvelope,
  ApiErrorEnvelope,
  LoginResult,
  LoginSuccessResponse,
  MfaEnrollmentResponse,
  MfaEnrollmentStepResponse,
  MfaStepResponse,
} from '@/shared/api/types';
import { refreshClientSession } from '@/shared/lib/bff-refresh';
import { mutatingFetchHeaders } from '@/shared/lib/csrf-client';

async function parseJson<T>(response: Response): Promise<ApiEnvelope<T>> {
  return response.json() as Promise<ApiEnvelope<T>>;
}

function throwBffError(response: Response, envelope: ApiErrorEnvelope): never {
  const message =
    typeof envelope.error.message === 'string'
      ? envelope.error.message
      : 'Request failed';
  const error = new Error(message) as Error & { status?: number; code?: string };
  error.status = response.status;
  error.code = envelope.error.code;
  throw error;
}

export type BffLoginResult =
  | LoginSuccessResponse
  | MfaStepResponse
  | MfaEnrollmentStepResponse;

export async function bffLogin(data: {
  email: string;
  password: string;
}): Promise<BffLoginResult> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...csrf },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const envelope = await parseJson<LoginResult>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data as BffLoginResult;
}

export async function bffVerifyMfa(data: {
  mfaToken: string;
  code: string;
}): Promise<{ expiresIn: number }> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/mfa/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...csrf },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const envelope = await parseJson<{ expiresIn: number }>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data;
}

export async function bffEnrollmentEnroll(
  enrollmentToken: string,
): Promise<MfaEnrollmentResponse> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/mfa/enrollment/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...csrf },
    body: JSON.stringify({ enrollmentToken }),
    credentials: 'include',
  });

  const envelope = await parseJson<MfaEnrollmentResponse>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data;
}

export async function bffEnrollmentConfirm(data: {
  enrollmentToken: string;
  code: string;
}): Promise<{ expiresIn: number }> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/mfa/enrollment/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...csrf },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const envelope = await parseJson<{ expiresIn: number }>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data;
}

export async function bffOAuthAuthorize(): Promise<{ url: string; state: string }> {
  const state = crypto.randomUUID();
  const response = await fetch(
    `/api/auth/oauth/authorize?state=${encodeURIComponent(state)}`,
    { credentials: 'include' },
  );

  const envelope = await parseJson<{ url: string }>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return { url: envelope.data.url, state };
}

export async function bffOAuthCallback(
  callbackUrl: string,
): Promise<BffLoginResult> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/oauth/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...csrf },
    body: JSON.stringify({ callbackUrl }),
    credentials: 'include',
  });

  const envelope = await parseJson<LoginResult>(response);
  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data as BffLoginResult;
}

export async function bffLogout(): Promise<void> {
  const csrf = await mutatingFetchHeaders();
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: csrf,
    credentials: 'include',
  });
}

async function fetchBffMe<T>(): Promise<{ response: Response; envelope: ApiEnvelope<T> }> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  const envelope = await parseJson<T>(response);
  return { response, envelope };
}

export async function bffMe<T>(): Promise<T> {
  let { response, envelope } = await fetchBffMe<T>();

  if (response.status === 401) {
    const refreshed = await refreshClientSession({ redirectOnFailure: true });
    if (refreshed) {
      ({ response, envelope } = await fetchBffMe<T>());
    }
  }

  if (!response.ok) {
    throwBffError(response, envelope as unknown as ApiErrorEnvelope);
  }

  return envelope.data;
}
