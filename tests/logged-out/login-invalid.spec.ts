import { test } from "../../fixtures/test-setup";
import invalidPasswordsData from "../../data/invalid-passwords.json";
import { standardUser } from "../../data/credentials";

const INVALID_PASSWORDS = invalidPasswordsData.invalidPasswords;

test("Log into eshop with invalid passwords", async ({ loginPage}) => {
    await loginPage.goto();
    await loginPage.checkPageTitle();
    for (const password of INVALID_PASSWORDS) {
        await loginPage.loginToApp(standardUser.username, password);
        await loginPage.getErrorMessage();
    }
});