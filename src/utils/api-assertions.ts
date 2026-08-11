import { expect, APIResponse } from "@playwright/test";

// Returns void because this function is synchronous i.e. no await or asynchronous operation inside it

// Validate the API response status code
export function expectStatus(response: APIResponse, expectedStatus: number): void {
    expect(response.status()).toBe(expectedStatus);
}

// Validate that the API response is JSON
export function expectJsonResponse(response: APIResponse): void {
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
}

// Validate that the API response is returned within the expected time
export function expectResponseTime(responseTime: number, maxTime: number): void {
    expect(responseTime).toBeLessThan(maxTime);
}