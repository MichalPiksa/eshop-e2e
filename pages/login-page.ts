import { type Page, type Locator } from "@playwright/test";

export class LoginPage 
{
    private readonly page: Page;
    private readonly url: string;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly pageTitle: Locator;
    private readonly errorMessage = 'h3[data-test="error"]';
    private readonly user: any;

    constructor(page: Page, user: any) {
        this.page = page;
        this.user = user;
        this.url = "/";
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.pageTitle = page.getByText('Swag Labs')
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    public async loginToApp(username?: string, password?: string): Promise<void> {
        const u = username ?? this.user.username;
        const p = password ?? this.user.password;
        await this.usernameInput.fill(u);
        await this.passwordInput.fill(p);
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