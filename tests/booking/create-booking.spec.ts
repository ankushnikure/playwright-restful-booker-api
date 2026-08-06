import { test, expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";
import { bookingData } from "@testdata/booking/booking-data";
import { generateTimestamp, generateUniqueValue, generateFirstName } from "@utils/test-data";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";

// Execute the same test with multiple datasets
bookingData.forEach((data) => {

    test(`Booking - Create Booking | ${data.testCase}`, async ({ request }) => {

        // Initialize API services
        const apiClient = new ApiClient(request);
        const bookingService = new BookingService(apiClient);

        // Prepare test data - Create a copy of the JSON payload template
        const createPayload = structuredClone(createBookingPayload);

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

        // Parse response body
        const body = await response.json();

        // Print current test execution details
        console.log(`Test Case: ${data.testCase}`);
        console.log("Booking Response:", body);
    });

});