import { test, expect } from "@fixtures/api.fixture";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";

test('Booking - GetBookingIds', async ({ apiClient, bookingService }) => {

    const getResponse = await bookingService.getBookingIds();
    const body = await apiClient.parseJsonResponse(getResponse);
    expect(getResponse.status()).toBe(200);
    console.log(body);
})