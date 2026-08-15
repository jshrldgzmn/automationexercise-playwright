import { Page, Locator } from "@playwright/test"

export class Footer {
    readonly page: Page
    readonly subscriptionEmail : Locator
    readonly subscriptionButton : Locator
    readonly subscriptionSuccess : Locator

    constructor (page : Page) {
        this.page = page
        this.subscriptionEmail = page.getByRole('textbox', { name: 'Your email address' })
        this.subscriptionButton = page.locator('#subscribe')
        this.subscriptionSuccess = page.locator('#success-subscribe')
    }

    async subscribe(email : string) {
        await this.subscriptionEmail.fill(email)
        await this.subscriptionButton.click()
    }
}