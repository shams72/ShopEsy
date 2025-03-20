# Validation List Middleware Documentation

## 1. `adjutListArticleInRequest`
Validates the request body for adjusting an article within a shopping list. Ensures:
- `listName`: A non-empty string representing the list's name.
- `articleName`: A non-empty string representing the article's name.
- `amount`: A non-negative number or `null`.

Responds with a `400` status code if validation fails.

---

## 2. `validateDeleteListNameParam`
Validates the request body for deleting a list by its name. Ensures:
- `name`: A non-empty string.

Responds with a `400` status code and an error message if validation fails.

---

## 3. `validateNameParam`
Validates the `name` parameter in the request URL. Ensures:
- The parameter is a non-empty string with a maximum length of 35 characters.

Responds with a `400` status code and an error message if validation fails.

---

## 4. `validateCreateShoppingList`
Validates the request body for creating a shopping list. Ensures:
- `name`: A non-empty string.
- `description`: An optional string.
- `item`: An array that must be empty by default.

Responds with a `400` status code if validation fails.

---

## 5. `validateListArticleAddition`
Validates the request body for adding articles to a shopping list. Ensures:
- `listName`: A non-empty string representing the list's name.
- `articles`: An object with the following properties:
  - `name`: A non-empty string.
  - `description`: A non-empty string.
  - `amount`: A number greater than 0.

Responds with a `400` status code if validation fails.

---

## 6. `validateDescriptionChangeShoppingList`
Validates the request body for changing a shopping list's description. Ensures:
- `name`: A non-empty string.
- `description`: An optional string.

Responds with a `400` status code if validation fails.

---

## 7. `validateEditNameList`
Validates the request body for editing a shopping list's name. Ensures:
- `name`: A non-empty string representing the current name.
- `newName`: A non-empty string representing the new name.

Responds with a `400` status code and an error message if validation fails.
