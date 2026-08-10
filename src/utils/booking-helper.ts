import { expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/payloads/create-booking.json";
import {
    generateTimestamp,
    generateUniqueValue,
    generateFirstName
} from "@utils/test-data-generator";
import { ApiClient } from "@api/clients/api.client";
import { BookingClient } from "@api/clients/booking.client";
import { CreateBookingResponse } from "@api/types/booking.types";

export async function createTestBooking(apiClient: ApiClient, bookingClient: BookingClient): Promise<number> {

    const payload = structuredClone(createBookingPayload);

    const timestamp = generateTimestamp();

    payload.firstname = generateFirstName(timestamp);
    payload.lastname = generateUniqueValue("Doe", timestamp);
    payload.additionalneeds = generateUniqueValue("Breakfast", timestamp);

    // Send POST request through bookingClient to retrieve booking details
    const response = await bookingClient.createBooking(payload);

    expect(response.status()).toBe(200);

   // Parse API response as CreateBookingResponse type
    const body = await apiClient.parseJsonResponse<CreateBookingResponse>(response);

    return body.bookingid;
}