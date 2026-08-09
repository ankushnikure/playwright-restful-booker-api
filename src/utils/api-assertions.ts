import { expect, APIResponse } from "@playwright/test";

// Validate that the API response has the expected status code
// Returns void because this function is synchronous i.e. no await or asynchronous operation inside it
export function expectStatus(response: APIResponse, expectedStatus: number): void {
    expect(response.status()).toBe(expectedStatus);
}

// Validate that the API response contains the expected content type
export function expectJsonResponse(response: APIResponse): void {
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
}