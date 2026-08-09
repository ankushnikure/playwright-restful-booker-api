import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { createTestBooking } from "@utils/booking-helper";

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

    expect(deleteResponse.status()).toBe(201);
    console.log("Status Code:", deleteResponse.status());

    console.log("Booking Deleted Successfully");

    // -----------------------------
    // Verify Deletion
    // -----------------------------

    const getResponse = await bookingService.getBooking(bookingId);

    expect(getResponse.status()).toBe(404);

});