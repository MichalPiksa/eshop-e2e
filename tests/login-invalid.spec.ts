import * as dotenv from 'dotenv';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import invalidPasswordsData from '../data/invalid-passwords.json';

dotenv.config();

const USERNAME = process.env.VALID_USERNAME;
const INVALID_PASSWORDS = invalidPasswordsData.invalidPasswords;

test("Log into eshop with invalid passwords", async ({ page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkPageTitle();
    for (const password of INVALID_PASSWORDS) {
        await loginPage.loginToApp(USERNAME!, password);
        await loginPage.getErrorMessage();
    }
});