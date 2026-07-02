import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  productList() {
    return this.page.locator('.inventory_item');
  }
}
