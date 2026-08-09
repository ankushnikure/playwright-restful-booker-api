import { test as base, Fixtures } from "@playwright/test";
import { ApiClient } from "@api/client";
import { BookingService } from "@api/services/booking.service";
import { request } from "node:http";
import { getAuthToken } from "@utils/auth";

// DEFINE: Define the objects that our custom test will provide
type ApiFixtures = {
    apiClient: ApiClient;
    bookingService: BookingService
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
    bookingService: async ({ apiClient }, use) => {

        const bookingService = new BookingService(apiClient);

        // USE: Make BookingService available to the test
        await use(bookingService);
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