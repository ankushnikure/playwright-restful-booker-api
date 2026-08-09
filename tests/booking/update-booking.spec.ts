import { test, expect } from "@fixtures/api.fixture";
import createBookingPayload from "@testdata/booking/create-booking.json";
import updateBookingPayload from "@testdata/booking/update-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { getAuthToken } from "@utils/auth";
import { createTestBooking } from "@utils/booking-helper";
import { expectStatus } from "@utils/api-assertions";

test("Booking - Update Booking", async ({ bookingService, authToken }) => {

    const bookingId = await createTestBooking(bookingService);

    console.log("Created Booking ID:", bookingId);

    // -----------------------------
    // Update Booking
    // -----------------------------

    const updatePayload = structuredClone(updateBookingPayload);

    const updateTimestamp = generateTimestamp();

    updatePayload.firstname = generateUniqueValue("UpdatedJohn", updateTimestamp);
    updatePayload.lastname = generateUniqueValue("UpdatedDoe", updateTimestamp);
    updatePayload.additionalneeds = generateUniqueValue("Lunch", updateTimestamp);

    const updateResponse = await bookingService.updateBooking(
        bookingId,
        updatePayload,
        authToken
    );

    // Validate response status code
    expectStatus(updateResponse, 200);

    const updateBody = await updateResponse.json();

    console.log("Update Booking Response:", updateBody);

    expect(updateBody.firstname).toBe(updatePayload.firstname);
    expect(updateBody.lastname).toBe(updatePayload.lastname);
    expect(updateBody.totalprice).toBe(updatePayload.totalprice);
    expect(updateBody.depositpaid).toBe(updatePayload.depositpaid);
    expect(updateBody.additionalneeds).toBe(updatePayload.additionalneeds);

});