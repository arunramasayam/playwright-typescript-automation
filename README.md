# Playwright TypeScript Automation Framework

Test automation framework for web applications using Playwright with TypeScript and Page Object Model design pattern.

## Project Overview

Automated test suite for SauceDemo e-commerce application covering end-to-end user flows including login, product selection, cart management, and checkout process.

## Tech Stack

- **Playwright** - Web automation framework
- **TypeScript** - Programming language
- **Page Object Model** - Design pattern for maintainable test code
- **GitHub Actions** - CI/CD pipeline

## Test Scenarios

1. **Login Tests** - Valid and invalid login scenarios
2. **Logout Test** - User logout functionality
3. **Place Order** - Complete checkout flow (add to cart → checkout → order completion)
4. **Remove from Cart** - Add and remove items from shopping cart
5. **About Page** - Navigation to external about page

## Project Structure
```
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD workflow configuration
├── pages/                    # Page Object Model classes
├── tests/                    # Test specification files
├── testdata.ts              # Test data (credentials, products)
├── utils.ts                 # Helper functions
└── playwright.config.ts
```

## Installation
```bash
npm install
npx playwright install
```

## Running Tests
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run with UI mode
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed
```

## View Test Reports
```bash
npx playwright show-report
```

## ⛓️ CI/CD Integration

This project uses **GitHub Actions** to ensure code quality. On every push to the `main` branch, a headless test suite is automatically triggered on a Linux runner.

* **Workflow**: [`.github/workflows/playwright.yml`](https://github.com/arunramasayam/playwright-typescript-automation/blob/main/.github/workflows/playwright.yml)
* **Test Results**: [View Latest Run](https://github.com/arunramasayam/playwright-typescript-automation/actions)
* **Artifacts**: Test reports and traces are uploaded and available for download after each run

[![Playwright Tests](https://github.com/arunramasayam/playwright-typescript-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/arunramasayam/playwright-typescript-automation/actions/workflows/playwright.yml)

## Features

- ✅ Page Object Model for maintainable code
- ✅ TypeScript for type safety
- ✅ Reusable test data management
- ✅ Comprehensive assertions
- ✅ Clean project structure
- ✅ Automated CI/CD with GitHub Actions
- ✅ Test artifacts and traces for debugging

## Author

**Arun Ramasayam**  
[LinkedIn](https://linkedin.com/in/arunreddyr) | [GitHub](https://github.com/arunramasayam)