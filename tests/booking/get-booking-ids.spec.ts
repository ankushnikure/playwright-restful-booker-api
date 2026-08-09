import { test } from "@fixtures/api.fixture";
import { expectStatus } from "@utils/api-assertions";
import { Booking } from "@api/types/booking.types";

test('Booking - GetBookingIds', async ({ apiClient, bookingClient }) => {

    const getResponse = await bookingClient.getBookingIds();

    // Parse API response body so TypeScript understands the response structure
    const body = await apiClient.parseJsonResponse<Booking>(getResponse);

    // Validate response status code
    expectStatus(getResponse, 200);
    console.log(body);
})