import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/create-booking.json";
import partialUpdateBookingPayload from "@testdata/booking/partial-update-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { createTestBooking } from "@utils/booking-helper";
import { Booking } from "@api/types/booking";
import { expectStatus } from "@utils/api-assertions";

test("Booking - Partial Update Booking", async ({ apiClient, bookingService, authToken }) => {

    const bookingId = await createTestBooking(bookingService);

    console.log("Created Booking ID:", bookingId);

    // -----------------------------
    // Partial Update Booking
    // -----------------------------

    // Create a copy of the PATCH payload and apply the Booking type
    // so TypeScript can check the request data structure
    const patchPayload: Partial<Booking> = structuredClone(partialUpdateBookingPayload);


    const patchTimestamp = generateTimestamp();

    patchPayload.firstname = generateUniqueValue("PatchedJohn", patchTimestamp);
    patchPayload.additionalneeds = generateUniqueValue("Dinner", patchTimestamp);

    // Send PATCH request through BookingService
    const patchResponse = await bookingService.partialUpdateBooking(
        bookingId,
        patchPayload,
        authToken
    );

    // Validate response status code
    expectStatus(patchResponse, 200);

    // Parse API response as Booking type
    const patchBody = await apiClient.parseJsonResponse<Booking>(patchResponse);

    console.log("Patch Booking Response:", patchBody);

    // Validate updated field
    expect(patchBody.firstname).toBe(patchPayload.firstname);

});