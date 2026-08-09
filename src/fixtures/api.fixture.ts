import { test as base } from "@playwright/test";
import { ApiClient } from "@api/clients/api.client";
import { BookingClient } from "@api/clients/booking.client";
import { getAuthToken } from "src/auth/auth";

// DEFINE: Define the objects that our custom test will provide
type ApiFixtures = {
    apiClient: ApiClient;
    bookingClient: BookingClient
    authToken: string;
}

// EXTEND: Extend Playwright's test with our custom fixtures
export const test = base.extend<ApiFixtures>({

    // CREATE: Create ApiClient using Playwright's built-in request fixture
    apiClient: async ({ request }, use) => {

        const apiClient = new ApiClient(request);

        // USE: Make ApiClient available to the test
        await use(apiClient);
    },

    // CREATE: Create BookingService using our ApiClient fixture
    bookingClient: async ({ apiClient }, use) => {

        const bookingClient = new BookingClient(apiClient);

        // USE: Make BookingService available to the test
        await use(bookingClient);
    },

    // CREATE: Generate authentication token
    authToken: async ({ request }, use) => {

        const token = await getAuthToken(request);

        // USE: Make authentication token available to the test
        await use(token);
    }
});

// Re-export expect so tests can import both from this fixture
export { expect } from "@playwright/test";