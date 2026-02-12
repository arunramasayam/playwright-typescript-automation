import { Page, Locator } from '@playwright/test';

export class MenuPage {
    readonly page: Page;
    readonly menu: Locator;
    readonly aboutBtn: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu = page.locator('#react-burger-menu-btn');
        this.aboutBtn = page.locator('#about_sidebar_link');
        this.logoutBtn = page.locator('#logout_sidebar_link')
    }

    //actions
    async gotoAbout() {
        await this.menu.click();
        await this.aboutBtn.click();
    }

    async logout() {
        await this.menu.click();
        await this.logoutBtn.click();
    }

    
}