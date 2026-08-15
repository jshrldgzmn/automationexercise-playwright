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

test('User should navigate from home to products and search for any product @regression', async ( {homePage, productsPage}) => {
    //Start navigate to home page
    await homePage.goto()
    await homePage.expectPageLoaded()

    //Navigate from nav bar and clicking product link
    await homePage.navBar.navigateTo(homePage.navBar.productLink)

    //Verify product page loaded
    await productsPage.expectPageLoaded()

    //Search for product
    await productsPage.searchProduct('Dress')
    await productsPage.expectSearchResultsVisible()
})

test('Search for an invalid product @regression', async ( {homePage, productsPage}) => {
    //Start navigate to home page
    await homePage.goto()
    await homePage.expectPageLoaded()

    //Navigate from nav bar and clicking product link
    await homePage.navBar.navigateTo(homePage.navBar.productLink)

    //Verify product page loaded
    await productsPage.expectPageLoaded()

    //Search for product
    await productsPage.searchProduct('xyzproductdoesnotexist123')
    await expect(productsPage.productsList).toHaveCount(0)
})