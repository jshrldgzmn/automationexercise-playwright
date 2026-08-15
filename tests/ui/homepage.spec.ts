import { test, expect } from '../../fixtures'


test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` })
    }
})

test('User navigates to the Home Page @regression @smoke', async ({ homePage }) => {
    await homePage.expectPageLoaded()
}) 

test('Navbar links should all be visible @regression', async ({ homePage }) => {
    await expect(homePage.navBar.homeLink).toBeVisible()
    await expect(homePage.navBar.cartLink).toBeVisible()
    await expect(homePage.navBar.loginLink).toBeVisible()
    await expect(homePage.navBar.testCasesLink).toBeVisible()
    await expect(homePage.navBar.apiTestingLink).toBeVisible()
    await expect(homePage.navBar.contactLink).toBeVisible()
})

test('Footer subscription should work @regression', async ({ homePage }) => {
    await homePage.footer.subscribe('test@gmail.com')
    await expect(homePage.footer.subscriptionSuccess).toBeVisible()
})

test('Navbar all links visible via assertion method @smoke', async ({ homePage }) => {
   await homePage.navBar.expectAllLinksVisible()
})