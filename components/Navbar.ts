import { Page, Locator, expect } from '@playwright/test'

export class Navbar {
    readonly page: Page
    readonly homeLink : Locator
    readonly productLink : Locator
    readonly cartLink : Locator
    readonly loginLink : Locator
    readonly testCasesLink : Locator
    readonly apiTestingLink : Locator
    readonly contactLink : Locator
    readonly logo : Locator

    constructor (page : Page) {
        this.page = page
        this.homeLink = page.getByRole('link', { name: ' Home' })
        this.productLink = page.getByRole('link', { name: ' Products' })
        this.cartLink = page.getByRole('link', { name: ' Cart' })
        this.loginLink = page.getByRole('link', { name: ' Signup / Login' })
        this.testCasesLink = page.getByRole('link', { name: ' Test Cases' })
        this.apiTestingLink = page.getByRole('link', { name: ' API Testing' })
        this.contactLink = page.getByRole('link', { name: ' Contact us' })
        this.logo = page.getByRole('link', { name: 'Website for automation' })
    }

    async navigateTo(link : Locator) {
        await link.click()
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.page.getByText('Logged in as').isVisible()
    }

    async expectAllLinksVisible() {
        await expect(this.homeLink).toBeVisible()
        await expect(this.productLink).toBeVisible()
        await expect(this.cartLink).toBeVisible()
        await expect(this.loginLink).toBeVisible()
        await expect(this.testCasesLink).toBeVisible()
        await expect(this.apiTestingLink).toBeVisible()
        await expect(this.contactLink).toBeVisible()
        await expect(this.logo).toBeVisible()    
    }

    async expectLoggedIn(username: string) {
        await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible() 
        await expect(this.loginLink).toBeHidden()
    }

    async expectLoggedOut() {
        await expect(this.page.getByText('Logged in as')).toBeHidden() 
        await expect(this.loginLink).toBeVisible()
    }
}