import { test, expect } from '../../fixtures'

test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto()
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` })
    }
})

test('User navigates to Contact Us page @smoke', async ({ contactPage }) => {
    await contactPage.expectPageLoaded()
})

test('Contact us forms should be visible @regression', async ({ contactPage }) => {
    await expect(contactPage.getInTouchHeader).toBeVisible()
    await expect(contactPage.nameField).toBeVisible()
    await expect(contactPage.emailField).toBeVisible()
    await expect(contactPage.subjectField).toBeVisible()
    await expect(contactPage.messageField).toBeVisible()
    await expect(contactPage.submitButton).toBeVisible()
})
