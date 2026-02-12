import { Page, Locator } from '@playwright/test';

export class CheckoutInfoPage {
    readonly page: Page;
    readonly checkoutTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postal: Locator;
    readonly continueToCheckoutOverviewBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutTitle = this.page.getByTestId('title');
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastName = this.page.getByPlaceholder('Last Name');
        this.postal = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueToCheckoutOverviewBtn = this.page.getByRole('button', { name: 'Continue' });
    }


    async enterCheckoutInfo(checkoutInfo: { firstName: string; lastName: string; postalCode: number; }) {
        await this.checkoutTitle.textContent();
        await this.firstName.fill(checkoutInfo.firstName);
        await this.lastName.fill(checkoutInfo.lastName);
        await this.postal.fill(checkoutInfo.postalCode.toString());

    }

    async gotoCheckoutOverview() {
        await this.continueToCheckoutOverviewBtn.click();
    }


}