# Playwright Fixtures 
- create reusable objects and provide them directly to tests.

## Core Pattern

DEFINE → EXTEND → CREATE → USE

ApiFixtures
    ↓
base.extend()
    ↓
new ApiClient(request)
    ↓
use(apiClient)

## Remember

1. DEFINE
   Define what the fixture provides.

2. EXTEND
   Extend Playwright's test with our fixtures.

3. CREATE
   Create the required object using dependencies.

4. USE
   Pass the created object to the test using `use()`.

## Our Project Flow

DEFINE
   ↓
ApiFixtures
   ↓
EXTEND
   ↓
base.extend()
   ↓
CREATE
   ↓
new ApiClient(request)
new BookingService(apiClient)
   ↓
USE
   ↓
await use(...)
   ↓
Test

## Architecture

                    Playwright
                        │
                     request
                        │
                        ▼
                    ApiClient
                        │
                        ▼
                 BookingService
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
        Create         Get        Update/Patch/Delete
          │             │             │
          └─────────────┴─────────────┘
                        │
                       Tests