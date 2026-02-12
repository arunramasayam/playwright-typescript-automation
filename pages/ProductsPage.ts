import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly products: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly addToCartBtn: Locator;
    readonly removeBtn: Locator;
    readonly shippingBadgeCount: Locator;
    readonly shoppingCartLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.products = this.page.locator('.inventory_item');
        this.productName = this.page.locator('//div[@data-test="inventory-item-name"]');
        this.productDescription = this.page.locator('.inventory_item_desc');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.addToCartBtn = this.page.locator('//button[text()="Add to cart"]');
        this.removeBtn = this.page.locator('//button[text()="Remove"]');
        this.shippingBadgeCount = this.page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    }

    //actions
    async addProductsToCart(items: { name: string; description: string; price: string; }[]) {
        const allProductLocators = await this.products.all();

        if (allProductLocators.length == 0) {
            throw new Error('Products not available in the application');
        }

        for (const item of items) {
            let itemFound = false;
            for (const productLocator of allProductLocators) {
                const productName = await productLocator.locator(this.productName).textContent();
                const productDescription = await productLocator.locator(this.productDescription).textContent();
                const productPrice = await productLocator.locator(this.productPrice).textContent();

                if ((productName == item.name && productDescription == item.description && productPrice == item.price)) {
                    await productLocator.locator(this.addToCartBtn).click();
                    await expect(productLocator.locator(this.removeBtn), "Remove Button should be enabled").toBeEnabled();
                    itemFound = true;
                    break;
                }
            }
            expect(itemFound, 'Item: ' + item.name + ', added to cart').toBeTruthy();
        }
    }

    async getCartCount() {
        return await this.shippingBadgeCount.textContent();
    }

    async gotoShoppingCart() {
        await this.shoppingCartLink.click();

    }

}