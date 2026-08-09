import { test, expect } from "@fixtures/api.fixture";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";
import { expectStatus } from "@utils/api-assertions";
import { Booking } from "@api/types/booking";

test('Booking - GetBookingIds', async ({ apiClient, bookingService }) => {

    const getResponse = await bookingService.getBookingIds();

    // Parse API response body so TypeScript understands the response structure
    const body = await apiClient.parseJsonResponse<Booking>(getResponse);

    // Validate response status code
    expectStatus(getResponse, 200);
    console.log(body);
})