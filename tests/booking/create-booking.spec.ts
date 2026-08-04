import { test, expect } from "playwright/test";

const timestamp = Date.now();

const payload = {
    firstname: `Test_${timestamp}`,
    lastname: `User${timestamp}`,
    totalprice: 241,
    depositpaid: true,
    bookingdates: {
        checkin: "2019-07-06",
        checkout: "2024-04-11"
    },
    additionalneeds: `Playwright API ${timestamp}`
};

test('Booking - CreateBooking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        data: payload
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
})