import { test as setup } from "../../fixtures/test-setup";

setup('write login session data', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await loginPage.loginButton.screenshot({ path: 'screenshots/login-page/login-button.png' });
    await loginPage.loginToApp();

    await page.waitForURL(dashboardPage.url);
    await dashboardPage.assertProductHeaderVisible();

    await page.context().storageState({ path: ".auth/login.json" });
});