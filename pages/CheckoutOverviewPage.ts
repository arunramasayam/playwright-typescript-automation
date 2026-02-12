import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly checkoutOverviewTitle: Locator;
    readonly itemTotal: Locator;
    readonly finishBtn: Locator;
    readonly cartItems: Locator;
    readonly cartItemName: Locator;
    readonly cartItemDescription: Locator;
    readonly cartItemPrice: Locator;
    readonly cartItemQuanity: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkoutOverviewTitle = this.page.getByTestId('title');
        this.cartItems = this.page.getByTestId('inventory-item');
        this.cartItemName = this.page.getByTestId('inventory-item-name');
        this.cartItemDescription = this.page.getByTestId('inventory-item-desc');
        this.cartItemQuanity = this.page.getByTestId('item-quantity');
        this.cartItemPrice = this.page.getByTestId('inventory-item-price');
        this.itemTotal = this.page.getByTestId('subtotal-label');
        this.finishBtn = this.page.getByTestId('finish');
    }


    async reviewCheckoutOverview(items: { name: string; description: string; price: string; }[]) {
        expect(await this.checkoutOverviewTitle.textContent(), 'heading should be "Checkout: Overview"').toBe('Checkout: Overview');
        const cartItems = await this.cartItems.all();
        expect(cartItems.length, 'No of Items added to cart must match in checkout overview').toBe(items.length);
        for (const item of items) {
            let itemFound = false;
            for (const [index, cartItem] of cartItems.entries()) {
                const cartItemName = await cartItem.locator(this.cartItemName).textContent();
                const cartItemDesc = await cartItem.locator(this.cartItemDescription).textContent();
                const cartItemPrice = await cartItem.locator(this.cartItemPrice).textContent();
                const cartItemQuantity = await cartItem.locator(this.cartItemQuanity).textContent();
                if (cartItemName == item.name && cartItemDesc == item.description && cartItemPrice == item.price && cartItemQuantity == '1') {
                    itemFound = true;
                    break;
                }
            }
            expect(itemFound, 'Item: ' + item.name + ' found in cart in Checkout Overiew').toBeTruthy();
        }
        return await this.itemTotal.textContent();
    }

    async placeorder() {
        await this.finishBtn.click();
    }
}

