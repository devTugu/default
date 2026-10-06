import { test, expect } from '@playwright/test';
import { fetchCsrf, loginAsAdmin } from './helpers/auth';

test.describe('Session refresh', () => {
  test('rejects refresh without CSRF token', async ({ page }) => {
    await loginAsAdmin(page);

    const response = await page.request.post('/api/auth/refresh');
    expect(response.status()).toBe(403);
  });

  test('allows refresh with valid CSRF token', async ({ page }) => {
    await loginAsAdmin(page);

    const csrf = await fetchCsrf(page);
    const response = await page.request.post('/api/auth/refresh', {
      headers: { 'x-csrf-token': csrf },
    });

    expect(response.status()).toBe(200);
    const json = (await response.json()) as { data: { expiresIn: number } };
    expect(json.data.expiresIn).toBeGreaterThan(0);
  });
});
