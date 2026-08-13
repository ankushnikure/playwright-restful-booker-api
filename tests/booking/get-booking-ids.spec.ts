import { test, expect } from "@fixtures/api.fixture";
import { BookingId } from "@api/types/booking.types";

test('Booking - GetBookingIds', async ({ apiClient, bookingClient }) => {

    const getResponse = await bookingClient.getBookingIds();

    // Parse API response as Booking[] type
    const body = await apiClient.parseJsonResponse<BookingId[]>(getResponse);

    // Validate response status code
    expect(getResponse.status()).toBe(200);
    console.log(body);
})

test("Booking - GetBookingIds - Filter by firstname and lastname", async ({ apiClient, bookingClient }) => {

    const response = await bookingClient.getBookingIds({
        params: {
            firstname: "Sally",
            lastname: "Brown"
        }
    });

    // Validate response status code
    expect(response.status()).toBe(200);

    const body = await apiClient.parseJsonResponse<BookingId[]>(response);

    expect(Array.isArray(body)).toBe(true);
    console.log(body);
});