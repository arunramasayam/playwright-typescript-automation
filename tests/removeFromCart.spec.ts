import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { YourCartPage } from '../pages/YourCartPage';
import { credentials, items } from '../testdata';
import { ProductsPage } from '../pages/ProductsPage';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.getHeading(), 'heading should be "Swag Labs"').toBe('Swag Labs');
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await expect(page, 'Should Navigate to Inventory URL').toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Remove Products from Shopping Cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);

    if (items.length == 0) {
        throw new Error("Given Items list is empty");
    }
    await productsPage.addProductsToCart(items);
    await productsPage.gotoShoppingCart();
    await expect(page, 'should navigate to Cart URL').toHaveURL('https://www.saucedemo.com/cart.html');
    expect(await productsPage.getCartCount(), 'No. of Items added to cart should match on Cart Badge').toBe(items.length.toString());
    await yourCartPage.verifyProductsInCart(items);
    expect(await yourCartPage.removeItemsFromShoppingCart(items.length), "Shopping Cart should be Empty").toBe(0);
});

