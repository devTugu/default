import { expect, type Page } from '@playwright/test';

const sidebar = (page: Page) => page.locator('[data-sidebar="sidebar"]');

/** Clicks a sidebar link; opens Access control when the target is nested there. */
export async function goToSidebarLink(
  page: Page,
  linkName: string,
  urlPattern: RegExp,
  options?: { underAccessControl?: boolean },
): Promise<void> {
  const nav = sidebar(page);
  const link = nav.getByRole('link', { name: linkName, exact: true });
  if (options?.underAccessControl && !(await link.isVisible())) {
    await nav.getByRole('button', { name: /access control/i }).click();
  }
  await link.click();
  await expect(page).toHaveURL(urlPattern, { timeout: 15_000 });
}

export async function goToUsers(page: Page): Promise<void> {
  await goToSidebarLink(page, 'Users', /\/dashboard\/users/, {
    underAccessControl: true,
  });
}

export async function goToRoles(page: Page): Promise<void> {
  await goToSidebarLink(page, 'Roles', /\/dashboard\/roles/, {
    underAccessControl: true,
  });
}

export async function goToSiteSettings(page: Page): Promise<void> {
  await goToSidebarLink(page, 'Site Settings', /\/dashboard\/site-settings/);
}
