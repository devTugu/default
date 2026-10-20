import { test, expect } from '@playwright/test';

async function isDocsCatalogAvailable(
  request: import('@playwright/test').APIRequestContext,
): Promise<boolean> {
  const response = await request.get('/docs/blocks');
  return response.status() !== 404;
}

test.describe('Design system docs (production)', () => {
  test('catalog returns 404 when disabled', async ({ request }) => {
    const response = await request.get('/docs/blocks');
    if (response.status() !== 404) {
      test.skip(true, 'Docs catalog enabled (NEXT_SERVER_MODE=dev)');
      return;
    }
    expect(response.status()).toBe(404);
  });
});

test.describe('Design system docs (development catalog)', () => {
  test.beforeEach(async ({ request }) => {
    const available = await isDocsCatalogAvailable(request);
    test.skip(!available, 'Docs catalog disabled (NEXT_SERVER_MODE=prod)');
  });

  test('blocks index loads with sidebar and primary nav', async ({ page }) => {
    await page.goto('/docs/blocks');
    await expect(
      page.getByRole('heading', { name: /blocks for building modern ui/i }),
    ).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blocks' }).first()).toBeVisible();
  });

  test('navbar block section shows previews', async ({ page }) => {
    await page.goto('/docs/blocks/marketing/navbar-section');
    await expect(page.getByRole('heading', { name: /navbar section/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /navbar 01/i })).toBeVisible();
  });

  test('legacy component routes redirect to block catalog', async ({ page }) => {
    await page.goto('/docs/components/navbar');
    await expect(page).toHaveURL(/\/docs\/blocks\/marketing\/navbar-section/);
  });
});
