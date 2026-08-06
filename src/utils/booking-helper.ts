import { expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data";
import { BookingService } from "@api/services/booking.service";

export async function createTestBooking(
    bookingService: BookingService
): Promise<number> {

    const payload = structuredClone(createBookingPayload);

    const timestamp = generateTimestamp();

    payload.firstname = generateFirstName(timestamp);
    payload.lastname = generateUniqueValue("Doe", timestamp);
    payload.additionalneeds = generateUniqueValue("Breakfast", timestamp);

    const response = await bookingService.createBooking(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    return body.bookingid;
}