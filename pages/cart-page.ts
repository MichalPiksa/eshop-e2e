import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartHeader: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartHeader = page.locator('span.title').filter({ hasText: 'Your Cart' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.removeButton = page.getByRole('button', { name: 'Remove' }).first();
    }

    public async assertCartHeaderVisible(): Promise<void> {
        await this.cartHeader.isVisible();
    }

    public async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    public async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    public async removeFirstProductFromCart(): Promise<void> {
        await this.removeButton.click();
    }
}