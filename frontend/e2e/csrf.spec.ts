import { test, expect } from '@playwright/test';
import { fetchCsrf } from './helpers/auth';

test.describe('CSRF', () => {
  test('rejects login without CSRF token', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: 'admin@example.com', password: 'Admin123!' },
    });
    expect(response.status()).toBe(403);
  });

  test('allows login with valid CSRF token', async ({ page }) => {
    const csrf = await fetchCsrf(page);
    const response = await page.request.post('/api/auth/login', {
      headers: { 'x-csrf-token': csrf },
      data: {
        email: process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com',
        password: process.env.E2E_ADMIN_PASSWORD ?? 'Admin123!',
      },
    });
    expect(response.status()).toBe(200);
  });
});
