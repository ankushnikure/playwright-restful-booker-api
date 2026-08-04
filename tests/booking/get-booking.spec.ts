import { test, expect } from "@playwright/test";

test("Booking - Get Booking", async ({ request }) => {
    const bookingId = 4;

    // Send GET request to retrieve booking details
    const response = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    // Validate response status code
    expect(response.status()).toBe(200);

    // Parse and validate response body
    const body = await response.json();
    expect(body.firstname).toBeDefined();

    // Print response body for debugging/reference
    console.log(body);
    console.log("First Name:", body.firstname);

    // Retrieve all response headers
    const headers = response.headers();

    // Print response headers for debugging/reference
    console.log(headers);
    console.log("Content-Length:", headers["content-length"]);
    console.log("Content-Type:", headers["content-type"]);
    console.log("Date:", headers["date"]);
    console.log("Server:", headers["server"]);

    // Content-Type may include charset (e.g. application/json; charset=utf-8)
    expect(headers["content-type"]).toContain("application/json");

    // These headers are dynamic or infrastructure-dependent, so only verify they exist
    expect(headers["content-length"]).toBeDefined();
    expect(headers["server"]).toBeDefined();
    expect(headers["date"]).toBeDefined();
});