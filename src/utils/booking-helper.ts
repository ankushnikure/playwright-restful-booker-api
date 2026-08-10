import { expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/payloads/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data-generator";
import { BookingClient } from "@api/clients/booking.client";

export async function createTestBooking(bookingClient: BookingClient): Promise<number> {

    const payload = structuredClone(createBookingPayload);

    const timestamp = generateTimestamp();

    payload.firstname = generateFirstName(timestamp);
    payload.lastname = generateUniqueValue("Doe", timestamp);
    payload.additionalneeds = generateUniqueValue("Breakfast", timestamp);

    const response = await bookingClient.createBooking(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    return body.bookingid;
}