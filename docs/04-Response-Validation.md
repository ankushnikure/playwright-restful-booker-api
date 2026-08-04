# 04. Response Validation

## Overview

Response validation ensures that an API returns the expected result in terms of:

- Status Code
- Response Body
- Response Headers
- Response Time
- Cookies *(when applicable)*
- JSON Schema *(Pending)*

---

## 1. Status Code Validation

Validates whether the API returns the expected HTTP status code.

Example:

```ts
expect(response.status()).toBe(200);
```

Common Status Codes:

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |

---

## 2. Response Body Validation

Validates the data returned by the API.

Example:

```ts
const body = await response.json();

expect(body.firstname).toBeDefined();
expect(body.lastname).toBeDefined();
```

Common Validations:

- Field existence
- Field value
- Data type
- Nested object
- Array validation

---

## 3. Response Header Validation

Headers provide metadata about the response.

Example:

```ts
const headers = response.headers();

expect(headers["content-type"]).toContain("application/json");
expect(headers["content-length"]).toBeDefined();
expect(headers["server"]).toBeDefined();
expect(headers["date"]).toBeDefined();
```

### Common Response Headers

| Header | Purpose |
|---------|---------|
| Content-Type | Response format |
| Content-Length | Response size |
| Date | Response timestamp |
| Server | Server information |

### Best Practices

Validate using:

- `toContain()` for `Content-Type`
- `toBeDefined()` for dynamic headers

Avoid validating:

- Exact `Date`
- Exact `Server`
- Exact `Content-Length`

---

## 4. Response Time Validation

Response time validation verifies how quickly the API responds.

Example:

```ts
const startTime = Date.now();

const response = await request.get(url);

const responseTime = Date.now() - startTime;

expect(responseTime).toBeLessThan(2000);
```

### Why Validate Response Time?

- Detect slow APIs
- Monitor performance degradation
- Ensure acceptable user experience

### Best Practices

✅ Validate against a threshold.

```ts
expect(responseTime).toBeLessThan(2000);
```

❌ Avoid validating an exact response time.

```ts
expect(responseTime).toBe(951);
```

### Choosing a Threshold

The acceptable response time should be based on the application's SLA (Service Level Agreement).

Typical expectations:

| API Type | Expected Response Time |
|-----------|-----------------------:|
| Internal API | < 500 ms |
| Public API | < 2 sec |
| Payment API | < 1 sec |
| Search API | < 300 ms |

---

## 5. Cookie Validation

Not applicable for the Restful Booker GET Booking API.

Reason:

- The endpoint does not return a `Set-Cookie` response header.
- Authentication is handled by sending a token in the request cookie.

---

## 6. JSON Schema Validation

JSON Schema validation ensures that the API response follows the expected structure and data types.

### Why use JSON Schema?

- Validates the complete response structure
- Detects missing fields
- Detects incorrect data types
- Reduces repetitive assertions
- Improves test maintainability

### AJV (Another JSON Validator)

AJV is a popular JSON Schema validator for JavaScript and TypeScript applications.

Installation:

```bash
npm install ajv
```

### Schema File

Example:

```
schemas/
└── booking.schema.json
```

### Validate Schema

```ts
const isSchemaValid = validateSchema(body);

if (!isSchemaValid) {
    console.log(validateSchema.errors);
}

expect(isSchemaValid).toBe(true);
```

### Best Practices

- Keep schemas in a dedicated `schemas` folder.
- Validate the response structure, not business values.
- Log schema validation errors for easier debugging.
- Reuse schemas across multiple test cases whenever possible.

### Manual Validation vs JSON Schema

Manual validation checks individual fields.

Schema validation verifies the complete response structure using a single assertion.