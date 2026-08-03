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
    console.log("Token: ", body.token);
})

test('Booking - UpdateBooking', async ({ request }) => {
    const bookingId = 1;
    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
            'Cookie': `token=${token}`
        },
        data: {
            firstname: 'gauri',
            lastname: 'palyekar',
            totalprice: 241,
            depositpaid: true,
            bookingdates: {
                checkin: '2019-07-06',
                checkout: '2024-04-11'
            },
            additionalneeds: 'learning playwright API'
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
})