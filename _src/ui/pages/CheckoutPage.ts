import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  summaryTotal() {
    return this.page.locator('.summary_total_label');
  }

  confirmationHeader() {
    return this.page.locator('.complete-header');
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}
