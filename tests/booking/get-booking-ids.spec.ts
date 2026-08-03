import { test, expect } from "playwright/test"; 

test('Booking - GetBookingIds', async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
})