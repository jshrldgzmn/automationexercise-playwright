export const users = {
    standard : {
        email: 'test@test.com',
        password: 'test@123',
        username: 'Test',
        name: 'Test User',
    },
    newUser: {
        email: `newuser_${Date.now()}@test.com`,
        password: 'Password123',
        username: 'New User',
        name: 'New User',
    },
    invalid : {
        email: 'invalid@test.com',
        password: 'wrongpassword',
    },
}