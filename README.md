# Playwright API Automation

A **Playwright + TypeScript API automation framework** built using the [RESTful Booker](https://restful-booker.herokuapp.com/) API.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Ajv – JSON Schema validation
- Jenkins – CI execution
- Git/GitHub

## API Coverage

- GET, POST, PUT, PATCH, DELETE
- Authentication & token handling
- Common headers
- Path & query parameters
- Request payload validation
- API chaining
- Dynamic test data
- Response body & header validation
- JSON Schema validation
- Negative testing
- Test cleanup
- Playwright HTML reporting
- Jenkins CI execution

## Framework Structure

```text
playwright-restful-booker-api/
│
├── src/
│   │
│   ├── api/                         # API testing layer
│   │   └── ...                      # API request methods / API clients
│   │
│   ├── auth/                        # Authentication layer
│   │   └── auth.ts                  # Authentication & token generation
│   │
│   ├── fixtures/                    # Reusable Playwright fixtures
│   │   └── api.fixture.ts           # API authentication fixture
│   │
│   ├── schemas/                     # JSON Schema validation
│   │   └── ...                      # API response schemas
│   │
│   ├── testdata/                    # Test data & request payloads
│   │   └── booking/
│   │       ├── create-booking.json  # Booking request payload
│   │       └── booking-data.ts      # Booking test scenarios/data
│   │
│   └── utils/                       # Reusable utility functions
│       └── ...                      # Common helper methods
│
├── tests/                           # API test specifications
│   │
│   ├── auth/                        # Authentication tests
│   │   └── ...
│   │
│   └── booking/                     # Booking API tests
│       └── api-chaining.spec.ts     # Create → Get/Update/Delete flow
│
├── docs/                            # Supporting project documentation
│   └── ...
│
├── playwright.config.ts             # Playwright test configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # NPM dependencies & scripts
├── .env                             # Local environment variables
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

## API Chaining

```text
Create Booking
      ↓
Get Booking
      ↓
Update Booking
      ↓
Delete Booking
```

Booking IDs generated during execution are reused for subsequent API operations.

## Authentication

Authentication is handled through a reusable fixture.

```text
Credentials
    ↓
Auth API
    ↓
Token
    ↓
Reusable Fixture
    ↓
Authenticated Requests
```

Credentials are managed through environment variables/Jenkins secrets and are not stored in the repository.

## Schema Validation

API responses are validated using **Ajv** against JSON Schemas to verify response structure and data types.

## Run Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/booking/api-chaining.spec.ts
```

View HTML report:

```bash
npx playwright show-report
```

## CI/CD

The test suite is configured to run through **Jenkins**, with credentials securely provided through Jenkins secrets.

## Key Learning

This project demonstrates practical API automation using Playwright, including authentication, CRUD operations, API chaining, reusable fixtures, test data management, schema validation, negative testing, and CI execution.

## Author

**Ankush Nikure**  
Software Quality Analyst
