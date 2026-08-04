# 08. Playwright Features

## beforeAll()

Runs once before all tests in a file.

Used for:

- Authentication
- Test setup
- Reusable data

Example:

```ts
test.beforeAll(async ({ request }) => {
    // Generate auth token
});
```

### Benefits

- Faster execution
- Avoids duplicate setup
- Improves test readability

---

## Pending

- beforeEach
- afterEach
- afterAll
- Fixtures
- APIRequestContext
- Parallel Execution
