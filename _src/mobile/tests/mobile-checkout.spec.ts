import { test, expect } from '@playwright/test';
import { MobileInventoryPage } from '../pages/MobileInventoryPage';

test.describe('Mobile Checkout', () => {
  let inventoryPage: MobileInventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new MobileInventoryPage(page);
    await page.goto('/inventory.html');
  });

  // ── Valid ────────────────────────────────────────────────────────────────────
  test('M-V01 @smoke — product list renders on mobile viewport', async () => {
    await expect(inventoryPage.productList()).toHaveCount(6);
  });

  test('M-V02 @smoke — add to cart works on mobile tap', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge()).toHaveText('1');
  });

  test('M-V03 — complete checkout flow on mobile', async ({ page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.getByRole('button', { name: 'Checkout' }).tap();
    await page.getByPlaceholder('First Name').fill('Jane');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).tap();
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).tap();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('M-V04 — burger menu opens on mobile', async () => {
    await inventoryPage.burgerMenu().tap();
    await expect(inventoryPage.burgerMenu().page().locator('.bm-menu')).toBeVisible();
  });

  // ── Invalid ──────────────────────────────────────────────────────────────────
  test('M-I01 — checkout with empty fields shows error on mobile', async ({ page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.getByRole('button', { name: 'Checkout' }).tap();
    await page.getByRole('button', { name: 'Continue' }).tap();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  // ── Security ─────────────────────────────────────────────────────────────────
  test('M-S01 @security — cannot access inventory without login on mobile', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/$/);
  });
});
