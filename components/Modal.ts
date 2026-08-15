import { Page, Locator } from '@playwright/test'

export class Modal {
    readonly page: Page
    readonly modalTitle : Locator
    readonly viewCartButton : Locator
    readonly continueShoppingButton : Locator

    constructor (page: Page) {
        this.page = page
        this.modalTitle = page.getByRole('heading', { name: 'Added!' })
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' })
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
    }

    async isVisible(): Promise<boolean> {
        return await this.modalTitle.isVisible()
    }

    async continueShopping() {
        await this.continueShoppingButton.click()
    }

    async viewCart() {
        await this.viewCartButton.click()
    }
}