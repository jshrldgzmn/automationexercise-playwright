import { test, expect } from '../../fixtures'

test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto()
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` })
    }
})

test('Products page should load correctly @smoke', async ( { productsPage }) => {
    await productsPage.expectPageLoaded()
})

test('Should search for a product @regression', async ( { productsPage }) => {
    await productsPage.searchProduct('T-Shirt')
    await productsPage.expectSearchResultsVisible()
})

test('Should navigate from home to products @regression', async ( {homePage, productsPage}) => {
    //Start navigate to home page
    await homePage.goto()
    await homePage.expectPageLoaded()

    //Navigate from nav bar and clicking product link
    await homePage.navBar.navigateTo(homePage.navBar.productLink)

    //Verify product page loaded
    await productsPage.expectPageLoaded()
})