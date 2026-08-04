# 02. Authentication

## 1. Token Authentication

RESTful Booker uses token-based authentication.

Authentication Endpoint:

```http
POST /auth
```

Request Body:

```json
{
  "username": "admin",
  "password": "password123"
}
```

Successful Response:

```json
{
  "token": "abc123xyz"
}
```

---

## 2. Using Authentication Token

The generated token is sent in subsequent requests requiring authorization.

Example:

```http
Cookie: token=<generated-token>
```

---

## 3. beforeAll()

Authentication is executed inside `beforeAll()` to avoid generating a token before every test.

Benefits:

- Faster execution
- Reusable token
- Cleaner test code

---

## Best Practices

- Generate the token only once when possible.
- Store the token in a reusable variable.
- Avoid hardcoding tokens.

---

## Key Takeaways

- Authentication is required for update and delete operations.
- `beforeAll()` is a suitable place for one-time authentication setup.