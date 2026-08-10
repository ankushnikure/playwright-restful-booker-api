import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/payloads/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data-generator";
import { createTestBooking } from "@utils/booking-helper";
import { expectStatus } from "@utils/api-assertions";

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
    expectStatus(deleteResponse, 201)
    console.log("Status Code:", deleteResponse.status());

    console.log("Booking Deleted Successfully");

    // -----------------------------
    // Verify Deletion
    // -----------------------------

    const getResponse = await bookingClient.getBooking(bookingId);

    expect(getResponse.status()).toBe(404);

});