import { test, expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";
import partialUpdateBookingPayload from "@testdata/booking/partial-update-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { getAuthToken } from "@utils/auth";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";
import { createTestBooking } from "@utils/booking-helper";

test("Booking - Partial Update Booking", async ({ request }) => {

    // Initialize services
    const apiClient = new ApiClient(request);
    const bookingService = new BookingService(apiClient);

    // Generate auth token
    const token = await getAuthToken(request);

    const bookingId = await createTestBooking(bookingService);

    console.log("Created Booking ID:", bookingId);

    // -----------------------------
    // Partial Update Booking
    // -----------------------------

    const patchPayload = structuredClone(partialUpdateBookingPayload);

    const patchTimestamp = generateTimestamp();

    patchPayload.firstname = generateUniqueValue("PatchedJohn", patchTimestamp);

    const patchResponse = await bookingService.partialUpdateBooking(
        bookingId,
        patchPayload,
        token
    );

    expect(patchResponse.status()).toBe(200);

    const patchBody = await patchResponse.json();

    console.log("Patch Booking Response:", patchBody);

    expect(patchBody.firstname).toBe(patchPayload.firstname);

});