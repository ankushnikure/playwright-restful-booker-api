import { test, expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";
import { bookingData } from "@testdata/booking/booking-data";
import { generateTimestamp, generateUniqueValue, generateFirstName } from "@utils/test-data";

// Execute the same test with multiple datasets
bookingData.forEach((data) => {

    test(`Booking - Create Booking | ${data.testCase}`, async ({ request }) => {

        // Create a copy of the JSON payload template
        const payload = structuredClone(createBookingPayload);

        // Generate a unique identifier for the current test execution
        const timestamp = generateTimestamp();

        // Update payload with values from the current test dataset
        payload.firstname = generateFirstName(timestamp);
        payload.lastname = generateUniqueValue(data.firstname, timestamp);
        payload.totalprice = data.totalprice;
        payload.depositpaid = data.depositpaid;
        payload.additionalneeds = generateUniqueValue(data.additionalneeds, timestamp);

        // Send POST request to create a booking
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

        // Validate response status code
        expect(response.status()).toBe(data.expectedStatus);

        // Parse response body
        const body = await response.json();

        // Print current test execution details
        console.log(`Test Case: ${data.testCase}`);
        console.log(body);
    });

});