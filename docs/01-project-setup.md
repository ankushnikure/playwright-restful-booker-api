# Playwright API Automation - Setup Guide

Quick reference for setting up the Playwright API automation project from scratch.

## 1. Create Project

```bash
mkdir playwright-api-automation
cd playwright-api-automation
```

## 2. Initialize npm:

```bash
npm init -y
```

## 3. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

## 4. Install TypeScript

```bash
npm install -D typescript @types/node
npx tsc --init
```

## 5. Install Environment Configuration

```bash
npm install dotenv
```

## 6. Optional Dependencies

Install these only when required by the framework:

```bash
npm install -D @faker-js/faker allure-playwright
```

- **Faker** – Generate dynamic test data
- **Allure Playwright** – Allure test reporting

## 7. Verify Playwright Installation

```bash
npx playwright --version
```

## 8. Run Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/booking/api-chaining.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## 9. View Playwright Report

```bash
npx playwright show-report
```

## 10. Environment Variables

Create a local `.env` file for environment-specific values.

Example:

```text
BASE_URL=<base-url>
BOOKER_USERNAME=<username>
BOOKER_PASSWORD=<password>
```

> Do not commit `.env` or any credentials/secrets to GitHub.

## 11. Jenkins Configuration

For Jenkins execution, configure the required credentials/environment variables through Jenkins rather than storing them in the repository.

Typical values:

```text
BASE_URL
BOOKER_USERNAME
BOOKER_PASSWORD
```

## Quick Setup

For an existing cloned project:

```bash
git clone <repository-url>
cd playwright-restful-booker-api
npm install
npx playwright install
npx playwright test
```
