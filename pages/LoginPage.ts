import { Page, Locator } from '@playwright/test';

export class LoginPage{
    readonly page:Page;
    //Locators
    readonly heading:Locator;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginBtn:Locator;
    readonly errorMsg:Locator;

    constructor(page:Page){
        this.page=page;
        this.heading=page.locator('//div[@class="login_logo" and text()="Swag Labs"]');
        this.username=page.locator('#user-name');
        this.password=page.locator('#password');
        this.loginBtn=page.locator('#login-button');
        this.errorMsg=page.locator('[data-test="error"]');
    }

    //Actions
    async goto(){
        await this.page.goto('/');
    }

    async getHeading(){
       return await this.heading.textContent();
       
    }
    
    async login(username:string, password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async getError(){
        return await this.errorMsg.textContent();
    }

  
};

