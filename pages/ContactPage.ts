import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ContactPage extends BasePage {
    readonly nameField : Locator
    readonly emailField : Locator
    readonly subjectField : Locator
    readonly messageField : Locator
    readonly uploadFile : Locator
    readonly submitButton : Locator
    readonly successMessage : Locator
    readonly getInTouchHeader : Locator

    constructor (page : Page) {
        super(page)
        this.nameField = page.getByRole('textbox', { name: 'Name' })
        this.emailField = page.getByRole('textbox', { name: 'Email', exact: true })
        this.subjectField = page.getByRole('textbox', { name: 'Subject' })
        this.messageField = page.getByRole('textbox', { name: 'Your Message Here' })
        this.uploadFile = page.getByRole('button', { name: 'Choose File' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have')
        this.getInTouchHeader = page.getByRole('heading', { name: 'Get In Touch' })
    }

    async goto(){
        await super.goto('/contact_us')
    }

    async submitContact( name : string, email : string, subject : string, message : string) {
        await this.nameField.fill(name)
        await this.emailField.fill(email)
        await this.subjectField.fill(subject)
        await this.messageField.fill(message)
        await this.submitButton.click()
    }

    async expectPageLoaded() {
        await expect(this.getInTouchHeader).toBeVisible()
        await expect(this.page).toHaveURL(/contact_us/)
    }
}