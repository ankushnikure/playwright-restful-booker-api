import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import bookingSchema from "../../schemas/booking.schema.json";

// Initialize AJV instance
const ajv = new Ajv();

// Compile JSON schema
const validateSchema = ajv.compile(bookingSchema);

test("Booking - Get Booking", async ({ request }) => {
    const bookingId = 4;

    const startTime = Date.now();

    // Send GET request to retrieve booking details
    const response = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    // Validate response status code
    expect(response.status()).toBe(200);

    // Parse response body
    const body = await response.json();

    // Validate response body
    expect(body.firstname).toBeDefined();

    // Validate response JSON schema
    const isSchemaValid = validateSchema(body);

    // Print schema validation errors (if any)
    if (!isSchemaValid) {
        console.log(validateSchema.errors);
    }

    expect(isSchemaValid).toBe(true);

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

    const responseTime = Date.now() - startTime;

    // Print response time for debugging/reference
    console.log(`Response Time: ${responseTime} ms`);

    // Validate response time
    expect(responseTime).toBeLessThan(2000);
});