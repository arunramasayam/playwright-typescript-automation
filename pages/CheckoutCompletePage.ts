import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly checkoutCompleteTitle: Locator;
    readonly successGreet: Locator;
    readonly successMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutCompleteTitle = this.page.getByTestId('title');
        this.successGreet = this.page.getByTestId('complete-header');
        this.successMsg = this.page.getByTestId('complete-text');
    }

    async verifyOrderPlaced() {
        expect(await this.checkoutCompleteTitle.textContent(), 'heading should be "Checkout: Complete!').
            toBe('Checkout: Complete!');
        const dispatchMsg = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        expect(await this.successMsg.textContent(), '"' + dispatchMsg + '"').
            toBe(dispatchMsg)
        return await this.successGreet.textContent();
    }

}