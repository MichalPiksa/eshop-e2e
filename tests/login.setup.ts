import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { DashboardPage } from "../pages/dashboard-page";
import { standardUser } from "../data/credentials";


setup('write login session data', async ({ page }) => {
    const loginPage = new LoginPage(page, standardUser);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await loginPage.loginToApp();

    const dashboardPage = new DashboardPage(page);
    await page.waitForURL(dashboardPage.url);
    await dashboardPage.assertProductHeaderVisible();

    await page.context().storageState({ path: ".auth/login.json" });
});