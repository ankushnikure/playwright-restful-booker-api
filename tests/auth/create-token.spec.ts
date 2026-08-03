import { test, expect } from '@playwright/test';

let token: string;

test('Auth - CreateToken' , async ({request}) => {
    const response = await request.post("https://restful-booker.herokuapp.com/auth",
        {
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                username: "admin",
                password: "password123"
            },

        });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    token= body.token;
    console.log("Token: ", body.token);
})

