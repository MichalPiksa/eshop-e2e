import { expect, type Page, type Locator } from "@playwright/test";

export class DashboardPage
{
    readonly page: Page;
    readonly productsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeader = page.locator('span.title').filter({ hasText: 'Products' });
    }

    public async assertProductHeaderVisible(): Promise<void> {
        await expect(this.productsHeader).toBeVisible();
    }
}