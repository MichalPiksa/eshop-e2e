import { type Page } from "@playwright/test";

export class LoginPage 
{
    readonly url = "https://www.saucedemo.com/";
    readonly page: Page;
    readonly usernameInput = '#user-name';
    readonly passwordInput = '#password';
    readonly loginButton = '#login-button';
    readonly pageTitle = '#root > div > div.login_logo';
    readonly errorMessage = 'h3[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    public async loginToApp(username, password): Promise<void> {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    public async checkPageTitle(): Promise<void> {
        const actualTitle = await this.page.textContent(this.pageTitle);
        if (actualTitle?.trim() !== "Swag Labs") {
            throw new Error(`Page title does not match. Expected: "Swag Labs", Actual: "${actualTitle}"`);
        }
    }

    public async getErrorMessage(): Promise<string | null> {
        const error = await this.page.textContent(this.errorMessage);
        return error?.trim() ?? null;
    }
}