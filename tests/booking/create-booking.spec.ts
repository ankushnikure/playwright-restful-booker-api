import { test, expect } from "playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";

test("Booking - Create Booking", async ({ request }) => {

    // Generate unique values for this test execution
    const timestamp = Date.now();

    // Create a copy of the JSON template
    const payload = structuredClone(createBookingPayload);

    payload.firstname = `Test_${timestamp}`;
    payload.lastname = `User_${timestamp}`;
    payload.additionalneeds = `Playwright API ${timestamp}`;

    const response = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: payload
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
});