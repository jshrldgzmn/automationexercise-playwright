import { test, expect } from '../fixtures'
import { users } from '../data/users'

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
    await loginPage.login(users.invalid.email, users.invalid.password)
    await loginPage.expectLoginFailure()
})

test('should fill in signup form @regression', async({ loginPage }) =>{
    await loginPage.signup(users.newUser.name, users.newUser.email)
})