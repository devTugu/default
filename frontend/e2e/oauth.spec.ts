import { test, expect } from '@playwright/test';

test.describe('OAuth SSO', () => {
  test.skip(
    process.env.NEXT_PUBLIC_OAUTH_ENABLED !== 'true',
    'OAuth E2E requires Keycloak (NEXT_PUBLIC_OAUTH_ENABLED=true)',
  );

  test('shows SSO button on sign-in page', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.getByRole('button', { name: 'Continue with SSO' })).toBeVisible();
  });
});
