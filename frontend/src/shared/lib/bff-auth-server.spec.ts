import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchInternal = vi.fn();
const parseInternalJson = vi.fn();

vi.mock('@/shared/lib/internal-api', () => ({
  fetchInternal,
  parseInternalJson,
}));

describe('bff-auth-server', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchInternal.mockReset();
    parseInternalJson.mockReset();
  });

  async function loadServer() {
    return import('@/shared/lib/bff-auth-server');
  }

  describe('refreshTokenPair', () => {
    it('returns token pair on success', async () => {
      const pair = {
        accessToken: 'access',
        refreshToken: 'refresh',
        expiresIn: 900,
      };

      fetchInternal.mockResolvedValue({ ok: true });
      parseInternalJson.mockResolvedValue({ success: true, data: pair });

      const { refreshTokenPair } = await loadServer();
      const result = await refreshTokenPair('refresh');

      expect(fetchInternal).toHaveBeenCalledWith('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'refresh' }),
      });
      expect(result).toEqual(pair);
    });

    it('returns null when upstream fails', async () => {
      fetchInternal.mockResolvedValue({ ok: false });

      const { refreshTokenPair } = await loadServer();
      const result = await refreshTokenPair('refresh');

      expect(result).toBeNull();
      expect(parseInternalJson).not.toHaveBeenCalled();
    });
  });

  describe('fetchAuthMe', () => {
    it('calls /auth/me with bearer token', async () => {
      fetchInternal.mockResolvedValue({ ok: true });

      const { fetchAuthMe } = await loadServer();
      await fetchAuthMe('access-token');

      expect(fetchInternal).toHaveBeenCalledWith('/auth/me', {
        method: 'GET',
        headers: { Authorization: 'Bearer access-token' },
      });
    });
  });
});
