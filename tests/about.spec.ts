import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { credentials } from '../testdata';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.getHeading(), 'heading should be "Swag Labs"').toBe('Swag Labs');
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await expect(page, 'Should Navigate to Inventory URL').toHaveURL('https://www.saucedemo.com/inventory.html');
});


test('Navigate to About Page', async ({ page }) => {
    const menuPage = new MenuPage(page);
    await menuPage.gotoAbout();
    await expect(page, 'Should Navigate to https://saucelabs.com/').toHaveURL('https://saucelabs.com/');
});