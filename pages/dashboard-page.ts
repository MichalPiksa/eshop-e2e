import { expect, type Page, type Locator } from "@playwright/test";

export class DashboardPage
{
    private readonly page: Page;
    public readonly url: string;
    private readonly productsHeader: Locator;
    private readonly addToCartButton: Locator;
    private readonly removeButton: Locator;
    private readonly cartButton: Locator;
    private readonly openMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.saucedemo.com/inventory.html";
        this.productsHeader = page.locator('span.title').filter({ hasText: 'Products' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
        this.removeButton = page.getByRole('button', { name: 'Remove' }).first();
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url);
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

    public async checkItemsInCartButton(expectedCount: number): Promise<void> {
        const buttonText = await this.cartButton.textContent();
        const itemCount = buttonText ? parseInt(buttonText) : 0;
        expect(itemCount).toBe(expectedCount);
    }
}