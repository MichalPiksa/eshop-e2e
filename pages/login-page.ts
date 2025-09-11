import { type Page, type Locator } from "@playwright/test";

export class LoginPage 
{
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly pageTitle: Locator;
    readonly errorMessage = 'h3[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.saucedemo.com/";
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.pageTitle = page.getByText('Swag Labs')
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    public async loginToApp(username, password): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async checkPageTitle(): Promise<void> {
        await this.pageTitle.isVisible();
    }

    public async getErrorMessage(): Promise<string | null> {
        const error = await this.page.textContent(this.errorMessage);
        return error?.trim() ?? null;
    }
}