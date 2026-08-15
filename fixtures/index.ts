import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'
import { ProductsPage } from '../pages/ProductsPage'

type MyFixtures = {
    loginPage : LoginPage
    homePage : HomePage
    contactPage : ContactPage
    productsPage : ProductsPage
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
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page)
        await use(productsPage)
    }
})

export { expect } from '@playwright/test'