import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import invalidPasswordsData from "../data/invalid-passwords.json";
import { standardUser } from "../data/credentials";

const INVALID_PASSWORDS = invalidPasswordsData.invalidPasswords;

test("Log into eshop with invalid passwords", async ({ page}) => {
    const loginPage = new LoginPage(page, standardUser);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    for (const password of INVALID_PASSWORDS) {
        await loginPage.loginToApp(standardUser.username, password);
        await loginPage.getErrorMessage();
    }
});