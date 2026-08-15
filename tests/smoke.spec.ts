import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/', {waitUntil: 'domcontentloaded'})
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` })
    }
})

test ('smoke testing in a home page', async ( {page}) =>{
    const homePageSlider = page.locator('#slider')
    const homePageNavigator = page.locator('#header')
    await expect(page).toHaveTitle('Automation Exercise')
    await expect(homePageSlider).toBeVisible()
    await expect(homePageNavigator).toBeVisible()
})