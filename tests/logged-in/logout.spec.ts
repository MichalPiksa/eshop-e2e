import { test } from "../../fixtures/test-setup";

test("Log out from the app", async ({ dashboardPage, menuPage, loginPage }) => {
    await dashboardPage.goto();
    await dashboardPage.assertProductHeaderVisible();
    await dashboardPage.openMenu();
    await menuPage.logout();
    await loginPage.checkPageTitle();
})