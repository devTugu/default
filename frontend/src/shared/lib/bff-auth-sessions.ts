import {
  AuthSessionsListSchema,
  type AuthSessionsList,
} from '@default/types/auth';
import { readApiErrorMessage } from '@default/utils/api-error-message';
import { mutatingFetchHeaders } from '@/shared/lib/csrf-client';

async function parseSessionsResponse(response: Response): Promise<AuthSessionsList> {
  const body = (await response.json()) as {
    success?: boolean;
    data?: unknown;
    error?: { message?: unknown };
  };

  if (!response.ok) {
    throw new Error(
      readApiErrorMessage(body.error?.message, 'Failed to load sessions'),
    );
  }

  const parsed = AuthSessionsListSchema.safeParse(body.data);
  if (!parsed.success) {
    throw new Error('Invalid sessions response from server');
  }
  return parsed.data;
}

export async function bffListAuthSessions(): Promise<AuthSessionsList> {
  const response = await fetch('/api/auth/sessions', {
    method: 'GET',
    credentials: 'include',
  });
  return parseSessionsResponse(response);
}

export async function bffRevokeAuthSession(sessionId: number): Promise<void> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch(`/api/auth/sessions/${sessionId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: csrf,
  });
  if (!response.ok && response.status !== 204) {
    const body = (await response.json()) as { error?: { message?: unknown } };
    throw new Error(
      readApiErrorMessage(body.error?.message, 'Failed to revoke session'),
    );
  }
}

export async function bffRevokeOtherAuthSessions(): Promise<void> {
  const csrf = await mutatingFetchHeaders();
  const response = await fetch('/api/auth/sessions/revoke-others', {
    method: 'POST',
    credentials: 'include',
    headers: csrf,
  });
  if (!response.ok && response.status !== 204) {
    const body = (await response.json()) as { error?: { message?: unknown } };
    throw new Error(
      readApiErrorMessage(body.error?.message, 'Failed to revoke sessions'),
    );
  }
}
