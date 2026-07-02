import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import fs from 'fs';

setup('authenticate', async ({ page }) => {
  fs.mkdirSync('./reports', { recursive: true });
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.UI_USERNAME ?? 'standard_user',
    process.env.UI_PASSWORD ?? 'secret_sauce',
  );
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: './reports/ui-auth.json' });
});
