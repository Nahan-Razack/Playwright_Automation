import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    public usernname_text: Locator;
    public password_text: Locator;
    public submit_button: Locator;
    public search_book: Locator

    constructor(page: Page) {
        this.page = page
        this.usernname_text = page.locator('#userName')
        this.password_text = page.locator('#password')
        this.submit_button = page.locator('#login')
        this.search_book= page.locator('#searchBox')
    }

    async login(username: string, password:string) {
        await this.usernname_text.fill(username)
        await this.password_text.fill(password)
        await this.submit_button.click()
    }

    async gotToSite() {
        await this.page.goto('https://demoqa.com/login')

    }

    async verifyLoginStatus() {
        await this.page.waitForSelector('#searchBox');
        expect(this.search_book).toBeVisible()
    }

}