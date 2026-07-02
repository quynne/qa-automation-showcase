import { Page } from '@playwright/test';

export class MobileInventoryPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: /add to cart/i }).tap();
  }

  async openMenu() {
    await this.page.getByRole('button', { name: 'Open Menu' }).tap();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').tap();
  }

  cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  productList() {
    return this.page.locator('.inventory_item');
  }

  burgerMenu() {
    return this.page.locator('#react-burger-menu-btn');
  }
}
