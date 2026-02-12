# Playwright TypeScript Automation Framework

Test automation framework for web applications using Playwright with TypeScript and Page Object Model design pattern.

## Project Overview

Automated test suite for SauceDemo e-commerce application covering end-to-end user flows including login, product selection, cart management, and checkout process.

## Tech Stack

- **Playwright** - Web automation framework
- **TypeScript** - Programming language
- **Page Object Model** - Design pattern for maintainable test code

## Test Scenarios

1. **Login Tests** - Valid and invalid login scenarios
2. **Logout Test** - User logout functionality
3. **Place Order** - Complete checkout flow (add to cart → checkout → order completion)
4. **Remove from Cart** - Add and remove items from shopping cart
5. **About Page** - Navigation to external about page

## Project Structure
```
├── pages/              # Page Object Model classes
├── tests/              # Test specification files
├── testdata.ts         # Test data (credentials, products)
├── utils.ts            # Helper functions
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

## Features

- Page Object Model for maintainable code
- TypeScript for type safety
- Reusable test data
- Comprehensive assertions
- Clean project structure

## Author

Arun Ramasayam