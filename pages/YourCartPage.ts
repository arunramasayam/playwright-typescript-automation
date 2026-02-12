import { Page, Locator, expect } from '@playwright/test';

export class YourCartPage {
    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItems: Locator;
    readonly cartItemQuantity: Locator;
    readonly cartItemName: Locator;
    readonly cartItemDescription: Locator;
    readonly cartItemPrice: Locator;
    readonly checkoutBtn: Locator;
    readonly removeItemBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = this.page.locator('//span[text()="Your Cart"]');
        this.cartItems = this.page.locator('.cart_item');
        this.cartItemQuantity = this.page.locator('.cart_quantity');
        this.cartItemName = this.page.locator('.inventory_item_name');
        this.cartItemDescription = this.page.locator('.inventory_item_desc');
        this.cartItemPrice = this.page.locator('.inventory_item_price');
        this.checkoutBtn = this.page.getByRole('button', { name: 'Checkout' });
        this.removeItemBtn = this.page.getByRole('button', { name: 'Remove' });
    }

    async verifyProductsInCart(items: { name: string; description: string; price: string; }[]) {
        await expect(this.cartTitle, "should show headig 'Your Cart'").toBeVisible();
        const allCartItems = await this.cartItems.all();
        expect(allCartItems.length, 'No of Items added to cart should match in Your Cart').toEqual(items.length);
        for (const item of items) {
            let itemFound = false;
            for (const cartItem of allCartItems) {
                const cartProductName = await cartItem.locator(this.cartItemName).textContent();
                const cartProductQuantity = await cartItem.locator(this.cartItemQuantity).textContent();
                const cartProductDescription = await cartItem.locator(this.cartItemDescription).textContent();
                const cartProductPrice = await cartItem.locator(this.cartItemPrice).textContent();
                if (cartProductName == item.name && cartProductDescription == item.description && cartProductPrice == item.price && cartProductQuantity == '1') {
                    itemFound = true;
                    break;
                }
            }
            expect(itemFound, item.name + ' found in shopping cart').toBeTruthy();
        }

    }

    async removeItemsFromShoppingCart(itemsCount: number) {
        const allCartItems = await this.cartItems.all();
        let allRemoveBtnLocators: Array<string> = [];
        expect(allCartItems.length, 'No of Items added to cart should match in Your Cart').toBe(itemsCount);
        for (const cartItem of allCartItems) {
            const id = await (cartItem.locator(this.removeItemBtn)).getAttribute('id');
            if (id !== null) {
                allRemoveBtnLocators.push(id);
            }
            else {
                throw new Error("Remove Item  Button not found");
            }
        }
        for (const removeBtnLocator of allRemoveBtnLocators) {
            await this.page.locator('#' + removeBtnLocator).click();
        }

        return (await this.cartItems.all()).length;
    }

    async gotoCheckoutInfo() {
        await this.checkoutBtn.click();
    }
}