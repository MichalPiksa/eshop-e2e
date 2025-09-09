import * as dotenv from 'dotenv';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

dotenv.config();

// const { VALID_USERNAME, VALID_PASSWORD } = process.env;
const VALID_USERNAME = "standard_user";
const VALID_PASSWORD = "secret_sauce";

// if (!VALID_USERNAME || !VALID_PASSWORD) {
//     throw new Error('Missing VALID_USERNAME or VALID_PASSWORD environment variables');
// }


test("Log into eshop", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await loginPage.loginToApp(VALID_USERNAME!, VALID_PASSWORD!);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.assertProductHeaderVisible();
})
