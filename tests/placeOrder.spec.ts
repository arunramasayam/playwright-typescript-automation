import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { YourCartPage } from '../pages/YourCartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { credentials, items, checkoutInfo } from '../testdata';
import { calculateItemsTotalPrice } from '../utils';



test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.getHeading(), 'heading should be "Swag Labs"').toBe('Swag Labs');
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await expect(page, 'Should Navigate to Inventory URL').toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Placed order successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutPage = new CheckoutInfoPage(page);
    const checkoutOveriewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    if (items.length == 0) {
        throw new Error("Given Items list is empty");
    }

    await productsPage.addProductsToCart(items);
    await productsPage.gotoShoppingCart();
    await expect(page, 'should navigate to Cart URL').toHaveURL('https://www.saucedemo.com/cart.html');
    expect(await productsPage.getCartCount(), 'No. of Items added to Cart should match on Cart Badge').toBe(items.length.toString());

    await yourCartPage.verifyProductsInCart(items);
    await yourCartPage.gotoCheckoutInfo();
    await expect(page, 'should navigate to Checkout Info URL').toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    await checkoutPage.enterCheckoutInfo(checkoutInfo);
    await checkoutPage.gotoCheckoutOverview();
    await expect(page, 'should navigate to Checkout Overview URL').toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    const expectedTotalItemsPrice = calculateItemsTotalPrice(items);
    expect(await checkoutOveriewPage.reviewCheckoutOverview(items), 'Total Items Price Mismatch').
        toBe('Item total: $' + expectedTotalItemsPrice);
    await checkoutOveriewPage.placeorder();
    await expect(page, 'should navigate to Checkout Complete URL').toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    expect(await checkoutCompletePage.verifyOrderPlaced(), 'Order Placed Successfully message "Thank you for your order!"').
        toBe('Thank you for your order!');
});




