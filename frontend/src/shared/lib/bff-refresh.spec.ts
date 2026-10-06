import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CSRF } from '@/shared/lib/csrf';

const mutatingFetchHeaders = vi.fn();
const updateExpiresAt = vi.fn();
const redirectToLogin = vi.fn();

vi.mock('@/shared/lib/csrf-client', () => ({
  mutatingFetchHeaders,
}));

vi.mock('@/shared/lib/session-hint', () => ({
  sessionHint: {
    updateExpiresAt,
  },
}));

vi.mock('@/shared/lib/clear-client-session', () => ({
  redirectToLogin,
}));

describe('refreshClientSession', () => {
  beforeEach(() => {
    vi.resetModules();
    mutatingFetchHeaders.mockResolvedValue({ [CSRF.HEADER]: 'csrf-token' });
    updateExpiresAt.mockReset();
    redirectToLogin.mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function loadRefresh() {
    return import('@/shared/lib/bff-refresh');
  }

  it('sends CSRF header on refresh', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { expiresIn: 900 } }),
    } as Response);

    const { refreshClientSession } = await loadRefresh();
    const result = await refreshClientSession();

    expect(mutatingFetchHeaders).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      '/api/auth/refresh',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: { [CSRF.HEADER]: 'csrf-token' },
      }),
    );
    expect(result).toBe(true);
  });

  it('updates session hint expiry on success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { expiresIn: 1200 } }),
    } as Response);

    const { refreshClientSession } = await loadRefresh();
    await refreshClientSession();

    expect(updateExpiresAt).toHaveBeenCalledWith(1200);
  });

  it('deduplicates concurrent refresh calls', async () => {
    let resolveFetch: (value: Response) => void = () => {};
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    vi.mocked(fetch).mockReturnValue(fetchPromise);

    const { refreshClientSession } = await loadRefresh();
    const first = refreshClientSession();
    const second = refreshClientSession();

    resolveFetch({
      ok: true,
      json: async () => ({ success: true, data: { expiresIn: 900 } }),
    } as Response);

    const [a, b] = await Promise.all([first, second]);
    expect(a).toBe(true);
    expect(b).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('redirects on failure when redirectOnFailure is true', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    const { refreshClientSession } = await loadRefresh();
    const result = await refreshClientSession({ redirectOnFailure: true });

    expect(result).toBe(false);
    expect(redirectToLogin).toHaveBeenCalled();
  });

  it('does not redirect on failure when redirectOnFailure is false', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    const { refreshClientSession } = await loadRefresh();
    const result = await refreshClientSession({ redirectOnFailure: false });

    expect(result).toBe(false);
    expect(redirectToLogin).not.toHaveBeenCalled();
  });
});
