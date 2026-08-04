# 03. Request Handling

## 1. Request Headers

Used to provide additional information about the request.

Example:

```ts
headers: {
    "Content-Type": "application/json"
}
```

---

## 2. Request Body

Used with POST, PUT and PATCH requests.

Example:

```ts
data: {
    firstname: "John",
    lastname: "Doe"
}
```

---

## 3. Path Parameters

Used to identify a specific resource.

Example:

```http
GET /booking/1
```

Playwright:

```ts
`/booking/${bookingId}`
```

---

## 4. Query Parameters

Used to filter or search resources.

Example:

```http
GET /booking?firstname=John
```

Playwright:

```ts
params: {
    firstname: "John"
}
```

---

# 05. Request Handling

## 1. Dynamic Payload

### Overview

A dynamic payload is a request body where one or more values are generated at runtime instead of being hardcoded.

### Why use Dynamic Payload?

- Avoid duplicate test data
- Allow repeated test execution
- Improve test reliability
- Simulate real-world scenarios

### Example

```ts
const timestamp = Date.now();

const payload = {
    firstname: `Test_${timestamp}`,
    lastname: `User_${timestamp}`,
    totalprice: 241,
    depositpaid: true,
    bookingdates: {
        checkin: "2019-07-06",
        checkout: "2024-04-11"
    },
    additionalneeds: `Playwright API ${timestamp}`
};
```

### Best Practices

- Generate only fields that require uniqueness.
- Use a single timestamp for all dynamic fields in a test.
- Keep business-related values deterministic.
- Use meaningful prefixes for generated values.

### Common Use Cases

- First Name
- Last Name
- Username
- Email Address
- Customer ID
- Order Reference

### Avoid

- Randomizing every field.
- Generating business values without a testing need.
- Calling `Date.now()` multiple times within the same payload.

## 2. Payload from JSON

### Overview

Instead of defining the request body inside the test, store it in a JSON file and import it into the test. This separates test data from test logic and makes payloads easier to maintain and reuse.

### Workflow

JSON Template → Create Copy → Modify Required Fields → Send Request

### Benefits

- Reusable request templates
- Cleaner test code
- Easier maintenance
- Test data separated from test logic

### Best Practices

- Keep JSON files as templates.
- Do not modify the imported JSON object directly.
- Create a fresh copy for each test before making changes.
- Modify only the fields required for the current scenario.

### Folder Structure

```text
src/
└── testdata/
    └── booking/
        └── create-booking.json
```

## Pending Topics

- Reusable Request Builder