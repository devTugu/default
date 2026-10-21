import { test, expect } from '@playwright/test';

const headerNav = (page: import('@playwright/test').Page) =>
  page.locator('header');

const footer = (page: import('@playwright/test').Page) =>
  page.locator('footer');

test.describe('Public site', () => {
  test('home page loads with hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(headerNav(page)).toBeVisible();
  });

  test('header shows site name link to home', async ({ page }) => {
    await page.goto('/');
    const homeBrandLink = page.locator('header a[href="/"]').first();
    await expect(homeBrandLink).toBeVisible();
  });

  test('footer shows site name', async ({ page }) => {
    await page.goto('/');
    await expect(footer(page)).toBeVisible();
    await expect(footer(page).locator('p').first()).not.toBeEmpty();
  });

  test('mobile menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const menuTrigger = page
      .locator('header')
      .getByRole('button', { name: /menu|цэс/i });
    await menuTrigger.click();
    await expect(
      page.getByRole('link', { name: /get started|эхлэх|dashboard/i }).last(),
    ).toBeVisible();
  });

  test('home shows about section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#about')).toBeVisible();
  });

  test('home hero shows primary call to action', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: /get started|эхлэх/i }).first(),
    ).toBeVisible();
  });
});
