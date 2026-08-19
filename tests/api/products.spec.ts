import { test, expect } from '@playwright/test'
import { products } from '../../data/products'

const BASE_URL = 'https://automationexercise.com'

test.describe('Products API', () => {

    test('GET all products should return 200 @api', async ({ request }) => {
        //Send GET request to products endpoint
        const response = await request.get(`${BASE_URL}/api/productsList`)

        //Verify the status code is 200
        expect(response.status()).toBe(200)

        // Parse response body as JSON
        const body = await response.json()


        //Verify response has products array
        expect(body).toHaveProperty('products')
        expect(body.products.length).toBeGreaterThan(0)
    })

    test('POST all products should return 405 @api', async ({ request }) => {
        //POST is not supported on this endpoint
        const response = await request.post(`${BASE_URL}/api/productsList`)

        const body = await response.json()

        expect(body.responseCode).toBe(405)
        expect(body.message).toBe('This request method is not supported.')
    })

    test('GET all brands should return 200 @api', async ({ request }) => {
        //Send GET request to brands list endpoint
        const response = await request.get(`${BASE_URL}/api/brandsList`)
        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty('brands')
        expect(body.brands.length).toBeGreaterThan(0)
    })

    test('POST search product should return results @api', async ({ request }) => {
        //POST with search term in form  data

        const response = await request.post(`${BASE_URL}/api/searchProduct`, {
            form: {
                search_product: 'T-Shirt',
            },
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body.responseCode).toBe(200)
        expect(body.products.length).toBeGreaterThan(0)
    })

    test('POST search product without parameter should return 400 @api', async ({ request }) => {
        //POST with no search term
        const response  = await request.post(`${BASE_URL}/api/searchProduct`)

        expect(response.status()).toBe(200)

        const body = await response.json()

        //API returns 400 in the body when parameter is mising
        expect(body.responseCode).toBe(400)
        expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.')
    })

    test('GET brands should return valid structure @api', async ({ request }) => {
        //Send GET request to brands list
        const response = await request.get(`${BASE_URL}/api/brandsList`)
        //Assert the response code  
        expect(response.status()).toBe(200)
        //Verify if the body has returned any brand values
        const body = await response.json()
        expect(body.responseCode).toBe(200)
        expect(body.brands.length).toBeGreaterThan(0)
        expect(body.brands[0].brand).toBeDefined()
    })

    test('POST search product with valid term should return matching results @api', async ({ request }) => {
        //Send POST request to search for product name that contains 'Top' 
        const response = await request.post(`${BASE_URL}/api/searchProduct`, {
            form: {
                search_product: products.search.topTerm,
            },
        })

        expect (response.status()).toBe(200)

        //Verify if the body has returned any product values
        const body = await response.json()
        
        expect(body.responseCode).toBe(200)
        expect(body.products.length).toBeGreaterThan(0)

        //Assertion of the body for all product names with 'Top'
        const hasTop = body.products.some((p: any) => p.name.includes('Top'))
        expect(hasTop).toBe(true)
    })

    test('POST search with invalid term should return empty results @api', async ( { request }) => {
        //Send POST request without parameter
        const response = await request.post(`${BASE_URL}/api/searchProduct`, {
            form: {
                search_product: products.search.invalidTerm,
            },
        })
        expect(response.status()).toBe(200)
        
        //Assertion of the body if the error code and error message is returned
        const body = await response.json()
        expect(body.responseCode).toBe(200)
        expect(body.products).toHaveLength(0)
    })
})