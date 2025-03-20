# Shopping Articles API - Endpoint Documentation

## Overview
This API provides comprehensive functionality for managing shopping articles. Below is a detailed explanation of each endpoint and how to use it.

## Endpoints

### 1. Get All Shopping Articles
```http
GET /getAllShoppingArticles
```

**Description:**
- Retrieves all shopping articles stored in the system
- Returns an array of article objects containing name, description, and amount

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

### 2. Create Shopping Article
```http
POST /createShoppingArticle
```

**Description:**
- Creates a new shopping article
- Requires name, description, and amount
- Validates that the article name doesn't already exist

**Request Body:**
```json
{
  "name": "Milk",
  "description": "1 gallon whole milk",
  "amount": 2
}
```

**Possible Responses:**
- 200: Article created successfully
- 400: Invalid input (missing fields or invalid amount)
- 409: Article name already exists

### 3. Edit Article Name
```http
PUT /editNameOfArticles
```

**Description:**
- Changes the name of an existing article
- Both current name and new name are required
- Validates that the new name isn't already in use

**Request Body:**
```json
{
  "name": "Milk",
  "newName": "Whole Milk"
}
```

**Possible Responses:**
- 200: Name updated successfully
- 400: Missing name or newName
- 404: Article not found
- 409: New name already exists

### 4. Edit Article Description
```http
PUT /editDescriptionOfArticles
```

**Description:**
- Updates the description of an existing article
- Requires article name and new description

**Request Body:**
```json
{
  "name": "Milk",
  "description": "Fresh organic whole milk"
}
```

**Possible Responses:**
- 200: Description updated successfully
- 400: Missing or invalid fields
- 404: Article not found

### 5. Adjust Amount By Name
```http
PUT /adjustAmountByName
```

**Description:**
- Changes the amount of a specific article
- Amount must be a positive number

**Request Body:**
```json
{
  "name": "Milk",
  "amount": 3
}
```

**Possible Responses:**
- 200: Amount updated successfully
- 400: Invalid amount (negative or non-numeric)
- 404: Article not found

### 6. Increase All Articles
```http
PUT /increaseAllArticles
```

**Description:**
- Increases the amount of all articles by a specified value
- Useful for bulk updates

**Request Body:**
```json
{
  "increaseAmount": 1
}
```

**Possible Responses:**
- 200: All articles increased successfully
- 400: Invalid increase amount

### 7. Decrease All Articles
```http
PUT /decreaseAllArticles
```

**Description:**
- Decreases the amount of all articles by a specified value
- Won't reduce amounts below zero

**Request Body:**
```json
{
  "decreaseAmount": 1
}
```

**Possible Responses:**
- 200: All articles decreased successfully
- 400: Invalid decrease amount

### 8. Delete Article By Name
```http
DELETE /deleteArticlesByName
```

**Description:**
- Removes a specific article from the system
- Requires the article name

**Request Body:**
```json
{
  "name": "Milk"
}
```

**Possible Responses:**
- 200: Article deleted successfully
- 400: Missing article name
- 404: Article not found

### 9. Delete All Articles
```http
DELETE /deleteAllArticles
```

**Description:**
- Removes all articles from the system
- Use with caution as this cannot be undone

**Possible Responses:**
- 200: All articles deleted successfully
- 404: No articles to delete
- 500: Error while deleting



