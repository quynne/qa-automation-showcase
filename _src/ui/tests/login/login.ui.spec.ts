import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── Valid ────────────────────────────────────────────────────────────────────
  test('L-V01 @smoke — valid credentials redirects to inventory', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  // ── Invalid ──────────────────────────────────────────────────────────────────
  test('L-I01 — wrong password shows error message', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText('do not match');
  });

  test('L-I02 — empty username shows error message', async () => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText('Username is required');
  });

  test('L-I03 — empty password shows error message', async () => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText('Password is required');
  });

  // ── Security ─────────────────────────────────────────────────────────────────
  test('L-S01 @security — locked out user cannot login', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toContainText('locked out');
  });
});
