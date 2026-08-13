import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/payloads/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data-generator";
import { createTestBooking } from "@utils/booking-helper";

test("Booking - Delete Booking", async ({ bookingClient, authToken }) => {

    const bookingId = await createTestBooking(bookingClient);

    console.log("Created Booking ID:", bookingId);

    // -----------------------------
    // Delete Booking
    // -----------------------------

    const deleteResponse = await bookingClient.deleteBooking(
        bookingId,
        authToken
    );

    // Validate response status code
    expect(deleteResponse.status()).toBe(201);
    console.log("Status Code:", deleteResponse.status());

    console.log("Booking Deleted Successfully");

    // -----------------------------
    // Verify Deletion
    // -----------------------------

    const getResponse = await bookingClient.getBooking(bookingId);

    expect(getResponse.status()).toBe(404);

});