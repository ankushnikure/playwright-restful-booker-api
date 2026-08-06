import { test, expect } from "playwright/test";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";

test('Booking - GetBookingIds', async ({ request }) => {

    // Initialize API services
    const apiClient = new ApiClient(request);
    const bookingService = new BookingService(apiClient);

    const response = await bookingService.getBookingIds();
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(body);
})