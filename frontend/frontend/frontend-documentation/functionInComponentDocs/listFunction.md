### 1. `handleArticles` 

The `handleArticles` function is responsible for adding an article to an existing shopping list and updating its quantity. 
The function starts by reading the article’s name, description, and the quantity (amount) from the form input. It then sends a `PUT` request to the `/addItemsToExistingListByName` endpoint with the list name, article details, and the specified quantity.

If the request is successful, the function updates the article’s quantity in the frontend using the `editAmountOfArticlesOnAddition` method from the context. This ensures that the frontend reflects the latest changes. Additionally, it calls `handleNewArticles` to update the shopping list with the newly added article.

### 2. `showInput` 
If the article is already present in the list, the form fields are disabled using the `showInput` function to prevent duplicate entries.

### 3. `handleNewList`

The `handleNewList` function is responsible for creating a new shopping list and sending it to the backend. It sends a `POST` request with the list's name, description, and an empty item array to the `/createShoppingList` endpoint.

The function first checks if the request was successful by evaluating the response status. If the response is not successful (e.g., the list could not be created), it sets the error state to `true` and triggers the display of an error message.

If the request is successful, the function updates the frontend by calling the `addNewList` method from the context. This method ensures that the new list is added to the application's state. After the list is successfully created, the error state is set to `false` to indicate no issues, and the form is reset using `resetForm()`.

### 4. `handleSearchForm`

The `handleSearchForm` function is responsible for handling the form submission for a search bar. When the user submits the search form, it updates the application state to reflect the search parameters.

It performs the following steps:

1. **Sanitization**: It sanitizes the values entered by the user using `DOMPurify.sanitize()` to prevent potential cross-site scripting (XSS) attacks, ensuring that both the search type and input text are safe for use.
   
2. **State Update**: 
   - It updates the `searchType` state, which indicates what the user wants to search by (e.g., name, description, or articles).
   - It also updates the `inputSearch` state with the text the user has entered in the search field.

3. **Set Search Box Visibility**: The `setSearchBox(true)` function is called to ensure that the search results or any relevant components related to the search are displayed.

4. **Reset Form**: The `resetForm()` method is called to reset the form fields to their initial state after the form has been submitted.

This function ensures that the form submission is handled correctly by sanitizing inputs, updating the relevant states, and resetting the form for further use.

### 5. `deleteAllList`

The `deleteAllList` function is responsible for handling the deletion of all shopping lists. It performs a `DELETE` request to the `/deleteAllLists` endpoint to remove all lists from the backend. If the request is successful, it triggers the `handleDeleteAllLists` function, which updates the frontend state to reflect that all lists have been deleted. 

### 6. `deleteThisList`

The `deleteThisList` function is responsible for deleting a specific shopping list. It sends a `DELETE` request to the `/deleteListsByName` endpoint with the name of the list to be deleted. If the request is successful, it updates the frontend state by calling the `updateDeleteLists` function, which removes the list from the UI. 

### 7. `handleDeleteItem`

The `handleDeleteItem` function is responsible for deleting an article from a shopping list. It sends a `DELETE` request to the backend, targeting the `/deleteArticleInListByName` endpoint. This request includes the list name, article name, and the amount of the article to be deleted. If the request is successful, the function performs two actions on the frontend: it removes the item from the list using `handleListItemsDeletion` and updates the article amount using `editAmountOfArticlesfromListonDeletion`.

### 8. `handleSubmit`

The `handleSubmit` function handles the submission of a form to update the name of an existing shopping list. It begins by sending a `PUT` request to the `/editNameOfShoppingLists` endpoint, including the current list name and the new name (after sanitizing it for security). If the request is successful, the function updates the list name in the frontend by calling the `editNameOfLists` method from the context and also updates the list name state using `setListName`. If the request fails, it sets an error state and resets the form to clear the input. Error handling is incorporated to catch any issues with the request, ensuring the system is resilient to network or server problems.

### 9. `handleDescriptionChange`

The `handleDescriptionChange` function is responsible for updating the description of a shopping list. It is triggered when the user submits a form to change the description of a list. The function begins by preparing the new description from the form input and then sends a `PUT` request to the `/editDescriptionOfShoppingLists` endpoint with the current list's name and the new description. If the request is successful, the function updates the description in the frontend using the `editDescriptionOfLists` method from the context, ensuring that the frontend reflects the latest changes. 

### 10. `handleDeleteAllItem`

The `handleDeleteAllItem` function is responsible for deleting all items from a specific shopping list. When called, it sends a `DELETE` request to the `/deleteAllItemsInListByName` endpoint with the list's name in the request body. If the request is successful, the function processes the returned data, which includes the list of articles removed from the shopping list. For each article, it updates the article’s amount in the frontend using the `editAmountOfArticles` method, ensuring the frontend reflects the changes. Finally, it calls the `handleDeleteAllItems` function from the context to remove all items from the list in the state. 
