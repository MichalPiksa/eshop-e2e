import { type Page, type Locator } from "@playwright/test";

export class MenuPage
{
    private readonly page: Page;
    private readonly closeButton: Locator;
    private readonly logoutLink: Locator;
    private readonly allItemsLink: Locator;
    private readonly aboutLink: Locator;
    private readonly resetAppStateLink: Locator;
    
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