import * as dotenv from "dotenv";
import { test as setup } from "@playwright/test";
// import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { DashboardPage } from "../pages/dashboard-page";

dotenv.config();

const { VALID_USERNAME, VALID_PASSWORD } = process.env;

if (!VALID_USERNAME || !VALID_PASSWORD) {
    throw new Error("Missing VALID_USERNAME or VALID_PASSWORD environment variables");
}
setup('write login session data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await loginPage.loginToApp(VALID_USERNAME!, VALID_PASSWORD!);

    const dashboardPage = new DashboardPage(page);
    await page.waitForURL(dashboardPage.url);
    await dashboardPage.assertProductHeaderVisible();

    await page.context().storageState({ path: ".auth/login.json" });
});