import { test, expect } from '../../fixtures'


test.describe('Network Interception' , () => {
    test('Should block ads and load page faster @regression', async ({ page }) => {
        //Block all requests to known add/tracker domains
        await page.route('**/*googlesyndication*', route => route.abort())
        await page.route('**/*doubleclick*', route => route.abort())
        await page.route('**/*fundingchoicesmessages*', route => route.abort())
        await page.route('**/*cloudflareinsights*', route => route.abort())
        
        //Navigate to homepage - shoud load faster without ads
        await page.goto('/', { waitUntil: 'domcontentloaded'})

        //Verify page still loads correctly
        await expect(page).toHaveURL('/')
        await expect(page.getByRole('link', { name: 'Website for automation'})).toBeVisible()
    })

    test('Should mock products API response @regression', async ({ page }) => {
        //Intercept products API and simulate server error
        await page.route('**/api/productsList', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    responseCode: 500,
                    products: [
                        {
                            id: 999,
                            name: 'Mocked Product',
                            price: 'Rs. 100',
                            brand: 'Mock Brand',
                            category: {
                                usertype: { usertype: 'Women',},
                                category: 'Tops'
                            }
                        }
                    ]
                })
            })
        })
        //Navigate to products page
        await page.goto('/products', { waitUntil: 'domcontentloaded'})

        //Verify page loaded
        await expect(page).toHaveURL('/products')
    })


    test('Should handle API error gracefully @regression', async ({ page }) => {
        //Intercept products API and simulate server error
        await page.route('**/api/productsList', async route => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    responseCode: 500,
                    message: 'Internal server Error'
                })
            })
        })

        //Navigate to products page
        await page.goto('/products', { waitUntil: 'domcontentloaded'})

        //Page should still load even if API fails
        await expect(page).toHaveURL('/products')
    })


    test('Mock empty products response @regression', async ({ page }) => {
        //Block all requests to known add/tracker domains
        await page.route('**/*googlesyndication*', route => route.abort())
        await page.route('**/*doubleclick*', route => route.abort())
        await page.route('**/*fundingchoicesmessages*', route => route.abort())
        await page.route('**/*cloudflareinsights*', route => route.abort())

        //Intercept products lists API and return a fake
        await page.route('**/api/productsList', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    responseCode: 200,
                    products: []
                })
            })
        })
        //Navigate to products page
        await page.goto('/products', { waitUntil: 'domcontentloaded'})

        //Page should still load after intercepting the products list API
        await expect(page).toHaveURL('/products')
        await expect(page.getByRole('textbox', { name: 'Search Product' })).toBeVisible()
    })

    test('Block images and verify page still loads @regression', async ({ page }) => {
        //Block all requests to known add/tracker domains
        await page.route('**/*googlesyndication*', route => route.abort())
        await page.route('**/*doubleclick*', route => route.abort())
        await page.route('**/*fundingchoicesmessages*', route => route.abort())
        await page.route('**/*cloudflareinsights*', route => route.abort())

        //Intercept products lists API and block by file extension
        await page.route('**/*.jpg', async route => route.abort())
        await page.route('**/*.png', async route => route.abort())
        //Navigate to products page
        await page.goto('/', { waitUntil: 'domcontentloaded'})

        //Page should still load after intercepting the products list API
        await expect(page).toHaveURL('/')
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible()
    })

    test('Simulate a slow network and verify page still loads @regression', async ({ page }) => {
        //Block all requests to known add/tracker domains
        await page.route('**/*googlesyndication*', route => route.abort())
        await page.route('**/*doubleclick*', route => route.abort())
        await page.route('**/*fundingchoicesmessages*', route => route.abort())
        await page.route('**/*cloudflareinsights*', route => route.abort())

        //Wait 2 seconds to simulate slow network
        await page.route('**/api/productsList', async route => {
        await page.waitForTimeout(2000)
        await route.continue()

        //Navigate to products page
        await page.goto('/products', { waitUntil: 'domcontentloaded'})

        //Page should still load after intercepting the products list API
        await expect(page).toHaveURL('/products')
        await expect(page.getByRole('textbox', { name: 'Search Product' })).toBeVisible()
        })
    })

})