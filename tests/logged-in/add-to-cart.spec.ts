import { test } from "../../fixtures/test-setup";

test("Add to cart one item", { tag: ['@prod' , '@dev'] }, async ({ dashboardPage }) => {
    await dashboardPage.goto();
    // await dashboardPage.validateFullPageScreenshot();
    await dashboardPage.assertProductHeaderVisible();
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.checkItemsInCartButton(1);
    await dashboardPage.goToCart();
})