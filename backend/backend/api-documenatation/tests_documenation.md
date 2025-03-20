# Shopping Articles - Shopping List Tests

## Technologies Used
- **Jest**: A JavaScript testing framework used for unit and integration tests.
- **Supertest**: A library for testing HTTP APIs, allowing easy assertions on request responses.

## Details
1. The tests use a separate JSON file for testing. This file has the same structure as the JSON file used for storing data during regular application usage.

2. The description of each test can be found in the `it` function within the test files. The `it` statements clearly explain the expected behavior of each test case.

## Test Scope
The tests validate the functionality of the **Shopping List** and **Shopping API**, ensuring they behave as expected.

## Test Location
The test files can be found in the `test` directory. The `testJSON` folder within the `test` directory contains the test database JSON.

## How to Run the Tests
To run the tests, use the following command in the root directory:

```bash
npm test
```