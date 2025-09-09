import { expect, type Page, type Locator } from "@playwright/test";

export class DashboardPage
{
    readonly page: Page;
    readonly productsHeader: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly cartButton: Locator;
    readonly openMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.locator('span.title').filter({ hasText: 'Products' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
        this.removeButton = page.getByRole('button', { name: 'Remove' }).first();
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    }

    public async assertProductHeaderVisible(): Promise<void> {
        await expect(this.productsHeader).toBeVisible();
    }

    public async addFirstProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    public async removeFirstProductFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    public async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    public async openMenu(): Promise<void> {
        await this.openMenuButton.click();
    }
}