import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard-page";
import { MenuPage } from "../pages/menu-page";
import { LoginPage } from "../pages/login-page";

test("Log out from the app", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const menuPage = new MenuPage(page);
    const loginPage = new LoginPage(page);
    await dashboardPage.goto();
    await dashboardPage.assertProductHeaderVisible();
    await dashboardPage.openMenu();
    await menuPage.logout();
    await loginPage.checkPageTitle();
})