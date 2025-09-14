import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard-page";

test("Add to cart one item", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.assertProductHeaderVisible();
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.checkItemsInCartButton(1);
    await dashboardPage.goToCart();
})