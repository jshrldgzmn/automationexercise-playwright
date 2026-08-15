import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator
    readonly nameField : Locator
    readonly signupEmailField : Locator
    readonly signupButton : Locator

    constructor (page: Page) {
        super(page)
        this.emailField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordField = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login'})
        this.errorMessage = page.getByText('Your email or password is incorrect!')
        this.nameField = page.getByRole('textbox', { name: 'Name' })
        this.signupEmailField = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signupButton = page.getByRole('button', { name: 'Signup' })
    }
    async goto() {
        await super.goto('/login')
    }

    async login(email: string, password: string) {
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }

    async signup(nameField: string, signupEmailField: string) {
        await this.nameField.fill(nameField)
        await this.signupEmailField.fill(signupEmailField)
        await this.signupButton.click()
    }

    async expectLoginSuccess(username : string ) {
        await expect(this.page).toHaveURL(/dashboard/)
        await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible()
    }

    async expectLoginFailure(){
        await expect(this.errorMessage).toBeVisible()
        await expect(this.page).toHaveURL(/login/)
    }
}