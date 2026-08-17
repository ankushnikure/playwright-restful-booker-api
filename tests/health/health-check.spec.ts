import { test, expect } from "@fixtures/api.fixture";
import { BASE_URL } from "@config/env";
import { ENDPOINTS } from "@api/endpoints/endpoints";

test("Health Check", async ({ apiClient }) => {
    const response = await apiClient.get(`${BASE_URL}${ENDPOINTS.PING}`);

    expect(response.status()).toBe(201);
});