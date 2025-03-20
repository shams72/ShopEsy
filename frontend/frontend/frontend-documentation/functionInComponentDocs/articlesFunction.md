### 1. `handleNameUpdate`

- This function handles updating the name of an article in the backend using the endpoint `/editNameOfArticles`
- It sends a `PUT` request to the backend with the current article's name and the new name.
- If the request is successful, it updates the article's name in the frontend by calling the `editNameOfArticles` method from the context. If the request fails, it sets an error state.

### 2. `handleDescriptionUpdate`

- This function handles updating the description of an article in the backend using the endpoint `/editDescriptionOfArticles`.
- It sends a `PUT` request to the backend with the article's name and the new description.
- If successful, it updates the description in the frontend by calling the `editDescriptionOfArticles` method from the context.

### 3. `handleAmountUpdate`

- This function handles updating the amount of an article in the backend using the endpoint `/adjustAmountByName`.
- It sends a `PUT` request to adjust the article’s amount in the backend with the provided quantity.
- If the request is successful, it updates the amount in the frontend by calling the `editAmountOfArticles` method from the context.

### 4. `handleEdit`

- This function handles the form submission for editing an article.
- It checks if there is a `name`, `desc`, or `quantity` to update. If any of these are provided, it sends requests to update the article’s name, description, or amount accordingly.
- It uses `Promise.all()` to make sure all the asynchronous update functions are handled before resetting the form and submitting the changes.
- If no changes are made, it skips sending unnecessary updates.

### 5. `handleDeleteAllProducts`

- This function handles the deletion of all articles (or products) from the backend and updates the frontend accordingly.
- It sends a `DELETE` request to the backend at the `/deleteAllArticles` endpoint.
- If the request is successful (status code 200), it calls the `deleteAllArticles` function from the `useArticles` context to remove all articles from the shopping list in the frontend.

### 6. `handleDecreaseAllProducts`

- This function handles the process of decreasing the quantity of all products in the backend and frontend.
- It sends a `PUT` request to the backend at the `/decreaseAllArticles` endpoint with the amount to decrease (`decreaseAmount`) from the form.
- Upon successful response, it updates the frontend by calling the `updateArticles` function from the `useArticles` context, passing the decreased amount and indicating the action as 'decrease'.
- The form is then reset using `resetForm()` to clear the input field.

### 7. `handleIncreaseAllProducts`

- This function handles the process of increasing the quantity of all products in both the backend and frontend.
- It sends a `PUT` request to the backend at the `/increaseAllArticles` endpoint with the amount to increase (`increaseAmount`) from the form.
- Upon a successful response, it updates the frontend by calling the `updateArticles` function from the `useArticles` context, passing the increased amount and indicating the action as "increase".
- The form is then reset using `resetForm()` to clear the input field.

### 8. `handleSubmit` 

The `handleSubmit` function is responsible for handling the form submission when a user adds a new article to the shopping list. The function sends the form data to the backend using a `POST` request. *DOMPurify** is used to sanitize the article's name and description before sending them to the backend. This helps to prevent any malicious code (like Cross-Site Scripting, XSS) from being included in the article data.