# 01. Core API Automation

## 1. HTTP Methods

### 1.1 GET

Retrieves data from the server without modifying it.

Example:

```http
GET /booking/1
```

Used to fetch booking details.

---

### 1.2 POST

Creates a new resource on the server.

Example:

```http
POST /booking
```

Used to create a new booking.

---

### 1.3 PUT

Updates an existing resource by replacing it completely.

Example:

```http
PUT /booking/{id}
```

---

### 1.4 PATCH

Partially updates an existing resource.

> Pending Implementation

---

### 1.5 DELETE

Removes an existing resource.

Example:

```http
DELETE /booking/{id}
```

---

## 2. CRUD Operations

| Operation | HTTP Method |
|-----------|-------------|
| Create | POST |
| Read | GET |
| Update | PUT / PATCH |
| Delete | DELETE |

---

## 3. Common Status Codes

| Status Code | Meaning |
|-------------|---------|
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

## Key Takeaways

- GET retrieves data.
- POST creates new resources.
- PUT replaces an existing resource.
- PATCH updates only required fields.
- DELETE removes a resource.