import { type Page, type Locator } from "@playwright/test";

export class MenuPage
{
    readonly page: Page;
    readonly closeButton: Locator;
    readonly logoutLink: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly resetAppStateLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByRole('button', { name: 'Close Menu' });
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
        this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    }

    public async closeMenu(): Promise<void> {
        await this.closeButton.click();
    }

    public async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    public async goToAllItems(): Promise<void> {
        await this.allItemsLink.click();
    }

    public async goToAbout(): Promise<void> {
        await this.aboutLink.click();
    }

    public async resetAppState(): Promise<void> {
        await this.resetAppStateLink.click();
    }
}