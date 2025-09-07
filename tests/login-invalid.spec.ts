import * as dotenv from 'dotenv';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

dotenv.config();

const USERNAME = process.env.VALID_USERNAME;
const INVALID_PASSWORDS = [
    "wrongpass",
    "123",
    "password",
    " ",
    "",
    "    ",
    "!@#$%^&*()",
    "<script>alert(1)</script>",
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "😊😂👍🏽",
    "veryveryveryveryveryveryveryveryveryverylongpassword",
    "pass\nword",
    "pass\tword",
    "\" OR \"\" = \"",
    "null",
    "undefined",
    "0xDEADBEEF",
];

test("Log into eshop with invalid passwords", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    for (const password of INVALID_PASSWORDS) {
        await loginPage.loginToApp(USERNAME!, password);
        await loginPage.getErrorMessage();
    }
});