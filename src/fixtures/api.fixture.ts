import { test as base, Fixtures } from "@playwright/test";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";

// DEFINE: Define the objects that our custom test will provide
type ApiFixtures = {
    apiClient: ApiClient;
    bookingService: BookingService
}

// EXTEND: Extend Playwright's test with our custom fixtures
export const test = base.extend<ApiFixtures>({

    apiClient: async ({ request }, use) => {

        // CREATE: Create ApiClient using Playwright's built-in request fixture
        const apiClient = new ApiClient(request);

        // USE: Make ApiClient available to the test
        await use(apiClient);
    },

    bookingService: async ({ apiClient }, use) => {

        // CREATE: Create BookingService using our ApiClient fixture
        const bookingService = new BookingService(apiClient);

        // USE: Make BookingService available to the test
        await use(bookingService);
    }
});

// Re-export expect so tests can import both from this fixture
export { expect } from "@playwright/test";