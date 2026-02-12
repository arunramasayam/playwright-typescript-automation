import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../testdata';

test('Successful Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.getHeading(), 'heading should be "Swag Labs"').toBe('Swag Labs');
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await expect(page, 'Should Navigate to Inventory URL').toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Invalid Login Shows Error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.getHeading(), 'Title has to be Swag Labs').toBe('Swag Labs');
    await loginPage.login(credentials.invalid.username, credentials.invalid.password);
    expect(await loginPage.getError(), 'Should show an error: "Epic sadface: Username and password do not match any user in this service"').
        toBe('Epic sadface: Username and password do not match any user in this service');
});