import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto('/inventory.html');
  });

  // ── Valid ────────────────────────────────────────────────────────────────────
  test('C-V01 @smoke — complete checkout with valid info', async ({ page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await checkoutPage.fillInfo('John', 'Doe', '10001');
    await expect(checkoutPage.summaryTotal()).toBeVisible();
    await checkoutPage.finish();
    await expect(checkoutPage.confirmationHeader()).toHaveText('Thank you for your order!');
  });

  test('C-V02 — cart badge updates when adding multiple items', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge()).toHaveText('2');
  });

  test('C-V03 — product list displays all items', async () => {
    await expect(inventoryPage.productList()).toHaveCount(6);
  });

  // ── Invalid ──────────────────────────────────────────────────────────────────
  test('C-I01 — checkout with empty first name shows error', async ({ page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await checkoutPage.fillInfo('', 'Doe', '10001');
    await expect(checkoutPage.errorMessage()).toBeVisible();
    await expect(checkoutPage.errorMessage()).toContainText('First Name is required');
  });

  test('C-I02 — checkout with empty zip shows error', async ({ page }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await checkoutPage.fillInfo('John', 'Doe', '');
    await expect(checkoutPage.errorMessage()).toBeVisible();
    await expect(checkoutPage.errorMessage()).toContainText('Postal Code is required');
  });
});
