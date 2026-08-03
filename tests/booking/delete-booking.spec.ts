import { test, expect } from "playwright/test";

let token: string;

test.beforeAll(async ({ request }) => {
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
    token = body.token;
    console.log("Token:", body.token);
})

test('DeleteBooking', async ({request}) => {
    const bookingID = 3;
    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: {
            'Cookie': `token=${token}`,
        },
        params: {
            'id': 1
        } 
    });
    expect(response.status()).toBe(201);
})

