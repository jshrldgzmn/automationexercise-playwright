import { test, expect } from '@playwright/test'
import { users } from '../../data/users'

const BASE_URL = 'https://automationexercise.com'

test.describe('User API', () => {

    test('POST verify login with valid credentials should return 200 @api', async ({ request }) => {
        //Generate unique user data
        const timestamp = Date.now()
        const testEmail = `testlogin_${timestamp}@test.com`
        const testPassword = 'Password123'

        //Step 1 - create new account
        await request.post(`${BASE_URL}/api/createAccount`, {
            form: {
                name: 'Test User',
                email: testEmail,
                password: testPassword,
                title: 'Mr',
                birth_date: '10',
                birth_month: '07',
                birth_year: '1990',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test company',
                address1: 'Address 1',
                address2: '',
                country: 'United States',
                zipcode: '12345',
                state: 'New York',
                city: 'New York',
                mobile_number: '1234567889'
            },
        })
        //Send POST request with valid credentials
        const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                email: testEmail,
                password: testPassword,
            },
        })
        
        expect(response.status()).toBe(200)
        const body = await response.json()
        //Verify login is successful
        expect(body.responseCode).toBe(200)
        expect(body.message).toBe('User exists!')

        await request.delete(`${BASE_URL}/api/deleteAccount`, {
            form: {
                email: testEmail,
                password: testPassword
            }
        })
    })

    test('POST verify login with invalid credentials should return 404 @api', async ({ request }) => {
        //Send POST request with invalid credentials
        const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                email: users.invalid.email,
                password: users.invalid.password,
            },
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        //Verify login fails with correct error code

        expect(body.responseCode).toBe(404)
        expect(body.message).toBe('User not found!')
    })

    test('POST verify login without email parameter should return 400 @api', async ({ request }) => {
        //Send POST request without email parameter
        const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                password: users.standard.password,
            },
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        //Verify bad request is returned

        expect(body.responseCode).toBe(400)
        expect(body.message).toContain('Bad request')
    })

    test('GET user detail by email should return user data @api', async ({ request }) => {
        //Send POST request without email parameter
        const response = await request.get(`${BASE_URL}/api/getUserDetailByEmail`, {
            params: {
                email: users.standard.email,
            },
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        //Verify user data is returned

        expect(body.responseCode).toBe(200)
        expect(body).toHaveProperty('user')
        expect(body.user.email).toBe(users.standard.email)
    })

    test('POST create acount then DELETE should succeed @api', async ({ request }) => {
        //Generate unique user data
        const timestamp = Date.now()
        const newEmail = `testuser_${timestamp}@test.com`

        //Step 1 - create new account
        const createResponse = await request.post(`${BASE_URL}/api/createAccount`, {
            form: {
                name: 'Test User',
                email: newEmail,
                password: 'Password123',
                title: 'Mr',
                birth_date: '10',
                birth_month: '07',
                birth_year: '1990',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test company',
                address1: 'Address 1',
                address2: '',
                country: 'United States',
                zipcode: '12345',
                state: 'New York',
                city: 'New York',
                mobile_number: '1234567889'
            },
        })

        const createBody = await createResponse.json()

        //Verify account created successfully

        expect(createBody.responseCode).toBe(201)
        expect(createBody.message).toBe('User created!')

        //Step 2 - Delete the created account
        const deleteResponse = await request.delete(`${BASE_URL}/api/deleteAccount`, {
            form: {
                email: newEmail,
                password: 'Password123',
            }
        })

        const deleteBody = await deleteResponse.json()

        //Verify account deleted successfully
         expect(deleteBody.responseCode).toBe(200)
         expect(deleteBody.message).toBe('Account deleted!')    
    
    })

    test('POST update account should succeed @api', async ({ request }) => {
        //Generate unique user data
        const timestamp = Date.now()
        const newEmail = `testuser_${timestamp}@test.com`

        //Step 1 - create new account
        const createResponse = await request.post(`${BASE_URL}/api/createAccount`, {
            form: {
                name: 'Test User',
                email: newEmail,
                password: 'Password123',
                title: 'Mr',
                birth_date: '10',
                birth_month: '07',
                birth_year: '1990',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test company',
                address1: 'Address 1',
                address2: '',
                country: 'United States',
                zipcode: '12345',
                state: 'New York',
                city: 'New York',
                mobile_number: '1234567889'
            },
        })

        const createBody = await createResponse.json()

        //Verify account created successfully
        expect(createBody.responseCode).toBe(201)
        expect(createBody.message).toBe('User created!')


        //Step 2 - Send POST request to update existing account
        const updateResponse = await request.put(`${BASE_URL}/api/updateAccount`, {
            form: {
                name: 'Updated User',
                email: newEmail,
                password: 'Password123',
                title: 'Mr',
                birth_date: '10',
                birth_month: '07',
                birth_year: '1990',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test company',
                address1: 'Address 1',
                address2: '',
                country: 'United States',
                zipcode: '12345',
                state: 'New York',
                city: 'Los Angeles',
                mobile_number: '1234567889'
            },
        })

        expect(updateResponse.status()).toBe(200)
        const body = await updateResponse.json()

        //Verify that the user details are updated
        expect(body.responseCode).toBe(200)
        expect(body.message).toBe('User updated!')

        //Step 3 - Use GET to verify the updated name and city

        const getUpdateResponse = await request.get(`${BASE_URL}/api/getUserDetailByEmail`, {
            params: {
                email: newEmail
            }
        })
        expect(getUpdateResponse.status()).toBe(200)
        const updateBody = await getUpdateResponse.json()
        expect(updateBody.user.name).toEqual('Updated User')
        expect(updateBody.user.city).toEqual('Los Angeles')

        
        //Step 4 - Delete the created account
        const deleteResponse = await request.delete(`${BASE_URL}/api/deleteAccount`, {
            form: {
                email: newEmail,
                password: 'Password123',
            }
        })

        const deleteBody = await deleteResponse.json()
        //Verify account deleted successfully
         expect(deleteBody.responseCode).toBe(200)
         expect(deleteBody.message).toBe('Account deleted!')    
    })
})