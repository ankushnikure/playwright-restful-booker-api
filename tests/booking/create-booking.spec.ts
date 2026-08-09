import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/create-booking.json";
import { bookingData } from "@testdata/booking/booking-data";
import { generateTimestamp, generateUniqueValue, generateFirstName } from "@utils/test-data";
import { Booking, CreateBookingResponse } from "@api/types/booking";

// Execute the same test with multiple datasets
bookingData.forEach((data) => {

    test(`Booking - Create Booking | ${data.testCase}`, async ({ apiClient, bookingService }) => {

        // Create a copy of the JSON payload and treat it as a Booking type
        // so TypeScript can validate the request payload structure
        const createPayload: Booking = structuredClone(createBookingPayload);

        // Generate a unique identifier for the current test execution
        const timestamp = generateTimestamp();

        // Update payload with values from the current test dataset
        createPayload.firstname = generateFirstName(timestamp);
        createPayload.lastname = generateUniqueValue(data.firstname, timestamp);
        createPayload.totalprice = data.totalprice;
        createPayload.depositpaid = data.depositpaid;
        createPayload.additionalneeds = generateUniqueValue(data.additionalneeds, timestamp);

        // Send POST request to create a booking
        const response = await bookingService.createBooking(createPayload);

        // Validate response status code
        expect(response.status()).toBe(data.expectedStatus);

        // Parse API response body so TypeScript understands the response structure
        const createBody = await apiClient.parseJsonResponse<CreateBookingResponse>(response);


        // Print current test execution details
        console.log(`Test Case: ${data.testCase}`);
        console.log("Booking Response:", createBody);
    });

});