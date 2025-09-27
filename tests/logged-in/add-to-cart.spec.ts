import { test } from "../../fixtures/test-setup";

test("Add to cart one item", async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await dashboardPage.captureScreenshot();
    await dashboardPage.assertProductHeaderVisible();
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.checkItemsInCartButton(1);
    await dashboardPage.goToCart();
})