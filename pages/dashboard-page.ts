import { Page, expect } from "@playwright/test";

export class DashboardPage
{
    private page: Page;
    private cartIcon = '//*[@id="shopping_cart_container"]/a';

    constructor(page: Page) {
        this.page = page;
    }

    public async assertCartIconVisible(): Promise<void> {
        await expect(this.page.locator(this.cartIcon)).toBeVisible();
    }
}