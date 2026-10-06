import { test, expect } from '@playwright/test';

test.describe('BFF allowlist', () => {
  test('blocks auth login via generic proxy', async ({ request }) => {
    const response = await request.post('/api/backend/auth/login', {
      data: { email: 'a@b.com', password: 'password123' },
    });
    expect(response.status()).toBe(403);
  });

  test('blocks unknown backend paths', async ({ request }) => {
    const response = await request.get('/api/backend/internal/debug');
    expect(response.status()).toBe(403);
  });
});
