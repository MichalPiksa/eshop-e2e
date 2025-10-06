import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { MenuPage } from '../pages/menu-page';
import { CartPage } from '../pages/cart-page';
import { User } from '../utils/user';


export type TestOptions = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    menuPage: MenuPage;
    cartPage: CartPage;
    user: User;
};

export const test = base.extend<TestOptions>({
    user: [{ username: '', password: ''}, {option: true, }],

    loginPage: async ({ page, user }, use) => {
        const loginPage = new LoginPage(
            page,
            user
        );
        await use(loginPage);
    },
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    menuPage: async ({ page }, use) => {
        const menuPage = new MenuPage(page);
        await use(menuPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }
});

export { expect } from '@playwright/test';