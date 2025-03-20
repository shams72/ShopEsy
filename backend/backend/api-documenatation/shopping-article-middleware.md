# Validation Article Middleware Documentation

## 1. `validateNameParam`
Validates that the `name` field in the request body is a non-empty string. 
Responds with a `400` status code if validation fails.

---

## 2. `validateRequestedShoppingArticle`
Validates the presence and format of `name`, `description`, and `amount` fields in the request body. Each field must meet specific requirements:
- `name` and `description`: Non-empty strings.
- `amount`: A positive number.

Responds with a `400` status code if validation fails.

---

## 3. `validateAdjustAmount`
Validates optional fields `increaseAmount` and `decreaseAmount` in the request body. Each field, if provided, must be a positive number. Returns a `400` status code for validation errors.

---

## 4. `validateAdjustAmountByName`
Checks the presence of `name` and ensures `amount` is a positive number. Designed for validating requests that adjust an article’s amount based on its name. Responds with a `400` status code if validation fails.

---

## 5. `validateEditDescription`
Validates the request body for editing an article's description. Ensures:
- `name`: A non-empty string representing the article's name.
- `description`: A non-empty string representing the article's new description.

If validation fails, it responds with a `400` status code and a list of validation error messages.

---

## 6. `validateEditNameList`
Validates the request body for editing the name of a shopping list. Ensures:
- `name`: A non-empty string representing the current name of the shopping list.
- `newName`: A non-empty string representing the new name for the shopping list.

If validation fails, it responds with a `400` status code and a validation error message indicating which field is missing or invalid.
