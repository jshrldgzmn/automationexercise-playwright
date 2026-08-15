import { test, expect } from '../fixtures'

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto()
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` })
    }
})

test('login page should load correctly @smoke @login', async ({ page }) => {
    await expect(page).toHaveURL(/login/)
    await expect(page.getByRole('heading', { name: 'Login to your account'})).toBeVisible()
})

test('should show error on invalid login @regression @login', async ({ loginPage }) => {
    await loginPage.login('testuser@example.com', 'testpassword123')
    await loginPage.expectLoginFailure()
})

test('should fill in signup form @regression', async({ loginPage }) =>{
    await loginPage.signup('joshua testing', "test2@gmail.com")
})