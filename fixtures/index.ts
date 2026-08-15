import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'

type MyFixtures = {
    loginPage : LoginPage
    homePage : HomePage
    contactPage : ContactPage
}

export const test = base.extend<MyFixtures> ({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await use(homePage)
    },
    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page)
        await use(contactPage)
    }
})

export { expect } from '@playwright/test'