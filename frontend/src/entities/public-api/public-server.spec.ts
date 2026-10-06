import { describe, expect, it, vi } from 'vitest';
import { getPublicSiteSettings } from './public-server';

vi.mock('@/shared/lib/internal-api', () => ({
  fetchInternal: vi.fn(),
  parseInternalJson: vi.fn(async (response: Response) => response.json()),
}));

describe('public-server', () => {
  it('returns null when site settings request fails', async () => {
    const { fetchInternal } = await import('@/shared/lib/internal-api');
    vi.mocked(fetchInternal).mockResolvedValue(
      new Response(null, { status: 500 }),
    );

    const settings = await getPublicSiteSettings();
    expect(settings).toBeNull();
  });
});
