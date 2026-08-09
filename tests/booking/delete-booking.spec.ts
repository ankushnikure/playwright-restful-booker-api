import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { createTestBooking } from "@utils/booking-helper";
import { expectStatus } from "@utils/api-assertions";

test("Booking - Delete Booking", async ({ bookingService, authToken }) => {

    const bookingId = await createTestBooking(bookingService);

    console.log("Created Booking ID:", bookingId);

    // -----------------------------
    // Delete Booking
    // -----------------------------

    const deleteResponse = await bookingService.deleteBooking(
        bookingId,
        authToken
    );

    // Validate response status code
    expectStatus(deleteResponse, 201)
    console.log("Status Code:", deleteResponse.status());

    console.log("Booking Deleted Successfully");

    // -----------------------------
    // Verify Deletion
    // -----------------------------

    const getResponse = await bookingService.getBooking(bookingId);

    expect(getResponse.status()).toBe(404);

});