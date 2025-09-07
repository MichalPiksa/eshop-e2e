import * as dotenv from 'dotenv';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

dotenv.config();

const { VALID_USERNAME, VALID_PASSWORD } = process.env;


test("Log into eshop", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await loginPage.loginToApp(VALID_USERNAME!, VALID_PASSWORD!);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.assertCartIconVisible();
})
