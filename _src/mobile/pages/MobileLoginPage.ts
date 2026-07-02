import { Page } from '@playwright/test';

export class MobileLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').tap();
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').tap();
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).tap();
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}
