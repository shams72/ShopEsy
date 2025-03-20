# Shopping Lists API - Endpoint Documentation

## Overview
This API provides comprehensive functionality for managing shopping lists. Below is a detailed explanation of each endpoint and how to use it.

## Endpoints

### 1. Get All Shopping Lists
```http
GET /getAllLists
````
**Description:**
- Retrieves all shopping lists stored in the database.
- Returns an array of shopping list objects containing the name, description, items, and amounts.


**Example Response:**
```json
{
  "shoppingArticles": [
    {
      "name": "Milk",
      "description": "1 gallon whole milk",
      "amount": 2
    },
    {
      "name": "Bread",
      "description": "Whole wheat loaf",
      "amount": 1
    }
  ]
}
```
### 2. Get Shopping List by Name
```http
GET /getShoppingListByName/{names}
````
**Description:**
- Fetches a shopping list based on the provided name.

**Possible Responses:**
- 200: Successfully found the shopping list.
- 400: Missing or invalid name.
- 404: List not found.
- 500: Internal server error.

### 3. Get Shopping Lists by Article Name
```http
GET /getShoppingListsByNameOfArticle/{names}
````
**Description:**
- Retrieves shopping lists that contain a specific article by its name.

**Possible Responses:**
- 200: Lists containing the article found.
- 400: No article name provided.
- 404: No lists containing the article.
- 500: Internal server error.

### 4. Get Shopping Lists by Description
```http
GET /getShoppingListByDescription/{desc}
````
**Description:**
- Retrieves shopping lists that match the provided description..

**Possible Responses:**
- 200: Lists containing the article found.
- 400: No article name provided.
- 404: No lists containing the article.
- 500: Internal server error.

### 5. Search for Products Using Brave Search

```http
GET /resultsFromTheWeb/{name}
````
**Description:** 
- Searches for products using the Brave search engine.

**Possible Responses:**
- 200: Successfully fetched search results.
- 400: Invalid or empty search query.
- 500: Failed to fetch data from Brave.

### 6. Create a New Shopping List

```http
POST /createShoppingList
````
**Description:**
- Creates a new shopping list with specified name, description, and items.

**Request Body:**
```json
{
  "name": "Groceries",
  "description": "Groceries for the week",
  "items": [
    {
      "name": "Milk",
      "description": "1 gallon whole milk",
      "amount": 2
    }
  ]
}
```

**Possible Responses:**

- 200: Shopping list successfully created.
- 400: Missing or invalid name.
- 409: List with the same name already exists.
- 500: Internal server error while saving the list.

### 7. Edit the Name of an Existing Shopping List
```http
PUT /editNameOfShoppingLists
```

**Description:**
- This endpoint allows updating the name of an existing shopping list. You need to provide both the current name and the new name of the shopping list.

**Request Body:**
```json
{
  "name": "Groceries",
  "newName": "Weekly Groceries"
}
```

**Possible Responses:**

- 200: Shopping list name successfully updated.
- 400: Missing or invalid fields (either the list name or new name).
- 404: The shopping list with the given name was not found.
- 409: The shopping list with the new name already exists.
- 500: Internal server error while updating the shopping list.


### 8. Edit the Description of an Existing Shopping List
```http
PUT /editDescriptionOfShoppingLists
```

**Description:**
- This endpoint allows updating the name of an existing shopping list. You need to provide both the current name and the new name of the shopping list.

**Request Body:**
```json
{
  "name": "Groceries",
  "description": "This list contains groceries for the week, including  fresh produce and dairy products."
}
```

**Possible Responses:**

- 200: Shopping list name successfully updated.
- 400: Missing or invalid fields (either the list name or description).
- 404: The shopping list with the given name was not found.
- 500: Internal server error while updating the shopping list.

### 9. Add Items to an Existing Shopping List by Name

```http
PUT /addItemsToExistingListByName
```

**Description:**
- This endpoint allows adding new items to an existing shopping list by its name. It checks if the article exists in the shopping list and if there is enough stock available to add the item.

**Request Body:**
```json
{
  "listName": "Groceries",
  "articles": [
    {
      "name": "Laptop",
      "description": "15-inch laptop with 16GB RAM and 512GB SSD.",
      "amount": 1
    }
  ]
}
```

**Possible Responses:**

- 200: Articles were successfully added to the shopping list.
- 400: Missing or invalid fields in the request body.
- 404: The shopping list with the given name was not found.
- 409: The article already exists in the shopping list.
- 500: Internal server error while processing the request.

### 10. Adjust the Amount of an Article in a Shopping List by Its Name

```http
PUT /adjustArticleAmountInListByName
```

**Description:**
- This endpoint adjusts the amount of an article in a shopping list. The amount will be updated based on the available stock in the main shopping articles list.

**Request Body:**
```json
{
  "listName": "Groceries",
  "articleName": "Laptop",
  "amount": 2
}
```

**Possible Responses:**

- 200: Article amount adjusted successfully.
- 400: Invalid or missing data in the request body.
- 404: The list, article, or article in the main shopping articles was not found.
- 500: Internal server error while processing the request.

### 11. Delete an Article from a Shopping List by Its Name

```http
DELETE /deleteArticleInListByName
```

**Description:**
- This endpoint allows deleting a specific article from an existing shopping list by its name. It updates the list and adjusts the stock of the article.

**Request Body:**
```json
{
  "listName": "Groceries",
  "articleName": "Laptop",
  "amount": 1
}
```

**Possible Responses:**

- 200: Article was successfully deleted from the shopping list.
- 400: Missing or invalid fields in the request body.
- 404: The shopping list or article does not exist.
- 500: Internal server error while processing the request.


### 12. Delete a Shopping List by Its Name

```http
DELETE /deleteListsByName
```

**Description:**
- This endpoint allows deleting a shopping list by its name. If the list exists, it is removed from the system, and the updated list is saved.

**Request Body:**
```json
{
  "name": "Groceries"
}
```
**Possible Responses:**

- 200: Shopping list was successfully deleted.
- 400: Missing or invalid name for the shopping list.
- 404: The shopping list does not exist.
- 500: Internal server error while processing the request

### 12. Delete a Shopping List by Its Name

```http
DELETE /deleteListsByName
```

**Description:**
- This endpoint allows deleting a shopping list by its name. If the list exists, it is removed from the system, and the updated list is saved.

**Request Body:**
```json
{
  "name": "Groceries"
}
```
**Possible Responses:**

- 200: Shopping list was successfully deleted.
- 400: Missing or invalid name for the shopping list.
- 404: The shopping list does not exist.
- 500: Internal server error while processing the request


### 13.  Delete All Items in a Shopping List by Its Name

```http
DELETE /deleteAllItemsInListByName
```

**Description:**
- This endpoint deletes all items from a specific shopping list by its name. It also returns the updated stock amounts for the affected articles in the main shopping articles list.

**Request Body:**
```json
{
  "name": "Groceries"
}
```
**Possible Responses:**

- 200: All items were successfully deleted from the shopping list.
- 400: Missing or invalid list name in the request body.
- 404: The shopping list with the specified name does not exist.
- 500: Internal server error while processing the request.

### 14.  Delete All Shopping Lists

```http
DELETE /deleteAllLists
```

**Description:**
-This endpoint deletes all shopping lists stored in the system. It clears the entire shopping list data and removes all lists from the file.


**Possible Responses:**

- 200: All shopping lists were successfully deleted.
- 404: No shopping lists exist to delete.
- 500: Internal server error while attempting to delete all lists.





