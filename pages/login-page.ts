import { Page } from "@playwright/test";

export class LoginPage 
{
    private url = "https://www.saucedemo.com/";
    private page: Page;
    private usernameInput = '#user-name';
    private passwordInput = '#password';
    private loginButton = '#login-button';
    private pageTitle = '#root > div > div.login_logo';
    private errorMessage = 'h3[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    public async loginToApp(username: string, password: string): Promise<void> {
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