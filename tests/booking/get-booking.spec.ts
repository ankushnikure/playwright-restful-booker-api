import { test, expect } from "playwright/test";

test.only('Booking - GetBooking', async ({ request }) => {
    const bookingId = 4;
    const response = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    console.log("name: ", body.firstname);
})