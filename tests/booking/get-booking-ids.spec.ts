import { test } from "@fixtures/api.fixture";
import { expectStatus } from "@utils/api-assertions";
import { BookingId } from "@api/types/booking.types";

test('Booking - GetBookingIds', async ({ apiClient, bookingClient }) => {

    const getResponse = await bookingClient.getBookingIds();

    // Parse API response as Booking[] type
    const body = await apiClient.parseJsonResponse<BookingId[]>(getResponse);

    // Validate response status code
    expectStatus(getResponse, 200);
    console.log(body);
})