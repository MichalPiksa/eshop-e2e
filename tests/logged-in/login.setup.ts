import { expect, test as setup } from "../../fixtures/test-setup";

setup('write login session data', async ({ loginPage, dashboardPage, page }, testInfo) => {
    await loginPage.goto();
    await loginPage.checkPageTitle();
    await expect(loginPage.loginButton).toHaveScreenshot("login-button.png");
    await loginPage.loginToApp();

    await page.waitForURL(dashboardPage.url);
    await dashboardPage.assertProductHeaderVisible();

    await dashboardPage.validateFullPageScreenshot();

    const proj = (testInfo.project?.name ?? 'local').replace(/[:\s]/g, '-');
    await page.context().storageState({ path: `.auth/${proj}.json` });
});