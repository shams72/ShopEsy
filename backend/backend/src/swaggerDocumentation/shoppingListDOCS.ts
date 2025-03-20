/**
 * @swagger
 * /getAllLists:
 *   get:
 *     summary: Get all shopping lists
 *     description: Retrieves all the shopping lists from the database.
 *     tags:
 *       - Shopping Lists
 *     responses:
 *       200:
 *         description: A list of all shopping lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shoppingLists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Unique identifier for the shopping list.
 *                       description:
 *                         type: string
 *                         description: The name of the shopping list.
 *                       amount:
 *                         type: number
 *                         description: The name of the shopping list.
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: The name of the item in the shopping list.
 *                             amount:
 *                               type: number
 *                               description: The amount/quantity of the item.
 *                             description:
 *                               type: string
 *                               description: A description of the item.
 *       500:
 *         description: Internal server error when fetching the shopping lists.
 */

/**
 * @swagger
 * /getShoppingListByName/{names}:
 *   get:
 *     summary: Retrieve a shopping list by name
 *     description: Fetches a shopping list based on the provided name.
 *     tags:
 *       - Shopping Lists
 *     parameters:
 *       - name: names
 *         in: path
 *         required: true
 *         description: The name of the shopping list to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully found the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     creationDate:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Laptop"
 *                           description:
 *                             type: string
 *                           amount:
 *                             type: integer
 *       400:
 *         description: Bad request, name field is missing or empty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter Name Field"
 *       404:
 *         description: List with the given name not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List with the given name not found"
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /getShoppingListsByNameOfArticle/{names}:
 *   get:
 *     summary: Retrieve shopping lists that contain a specific article by its name
 *     description: Fetches shopping lists that contain the provided article name.
 *     tags:
 *       - Shopping Lists
 *     parameters:
 *       - name: names
 *         in: path
 *         required: true
 *         description: The name of the article to search for in the shopping lists.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully found shopping lists that contain the article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: No article name provided or article name is empty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No shopping list found containing the article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /getShoppingListByDescription/{desc}:
 *   get:
 *     tags:
 *       - Shopping Lists
 *     summary: Retrieve shopping lists by description
 *     description: This endpoint allows you to retrieve shopping lists by their description. It searches for lists matching the provided description.
 *     parameters:
 *       - name: desc
 *         in: path
 *         required: true
 *         description: The description of the shopping list to search for.
 *         schema:
 *           type: string
 *           example: "Groceries for the week"
 *     responses:
 *       200:
 *         description: Lists matching the description were found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The following lists match the description."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ShoppingList'
 *       404:
 *         description: No lists found with the specified description.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lists with this description do not exist."
 *                 data:
 *                   type: string
 *                   example: "Groceries for the week"
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Groceries"
 *         description:
 *           type: string
 *           example: "Groceries for the week"
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: "2024-11-21T14:00:00Z"
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Apple"
 *               amount:
 *                 type: number
 *                 example: 10
 */

/**
 * @swagger
 * /resultsFromTheWeb/{name}:
 *   get:
 *     tags:
 *       - Shopping Lists
 *     summary: Search for products using Brave search engine
 *     description: This endpoint allows you to search for products to buy online using the Brave search engine.
 *     parameters:
 *       - name: name
 *         in: path
 *         description: The search term to search for products online.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched search results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       url:
 *                         type: string
 *       400:
 *         description: Invalid or empty search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to fetch data from Brave API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /createShoppingList:
 *   post:
 *     tags:
 *       - Shopping Lists
 *     summary: Create a new shopping list
 *     description: This endpoint allows the creation of a new shopping list. It accepts the name, description, and items for the shopping list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the shopping list.
 *                 example: "Groceries"
 *               description:
 *                 type: string
 *                 description: A description of the shopping list.
 *                 example: "This list contains groceries for the week."
 *               items:
 *                 type: array
 *                 description: A list of items for the shopping list.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the item.
 *                       example: "Milk"
 *                     description:
 *                       type: string
 *                       description: A description of the item.
 *                       example: "2% milk, 1 gallon."
 *                     amount:
 *                       type: number
 *                       description: The amount of the item.
 *                       example: 1
 *     responses:
 *       200:
 *         description: Shopping list successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     creationDate:
 *                       type: string
 *                       format: date-time
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           amount:
 *                             type: number
 *       400:
 *         description: Missing or invalid name for the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: A shopping list with the same name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 reason:
 *                   type: string
 *       500:
 *         description: Internal server error while saving the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /editNameOfShoppingLists:
 *   put:
 *     tags:
 *       - Shopping Lists
 *     summary: Edit the name of an existing shopping list
 *     description: This endpoint allows updating the name of an existing shopping list. You need to provide both the current name and the new name of the shopping list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The current name of the shopping list that needs to be updated.
 *                 example: "Groceries"
 *               newName:
 *                 type: string
 *                 description: The new name for the shopping list.
 *                 example: "Weekly Groceries"
 *     responses:
 *       200:
 *         description: Shopping list name successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                   description: The new name of the shopping list.
 *                   example: "Weekly Groceries"
 *       400:
 *         description: Missing or invalid fields (either the list name or new name).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: The shopping list with the given name was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: The shopping list with the new name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error while updating the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /editDescriptionOfShoppingLists:
 *   put:
 *     tags:
 *       - Shopping Lists
 *     summary: Edit the description of an existing shopping list
 *     description: This endpoint allows updating the description of an existing shopping list. You need to provide both the current name and the new description of the shopping list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The current name of the shopping list whose description needs to be updated.
 *                 example: "Groceries"
 *               description:
 *                 type: string
 *                 description: The new description for the shopping list.
 *                 example: "This list contains groceries for the week, including fresh produce and dairy products."
 *     responses:
 *       200:
 *         description: Shopping list description successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                   description: The updated description of the shopping list.
 *                   example: "This list contains groceries for the week, including fresh produce and dairy products."
 *       400:
 *         description: Missing or invalid fields (either the list name or description).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: The shopping list with the given name was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error while updating the shopping list description.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /addItemsToExistingListByName:
 *   put:
 *     tags:
 *       - Shopping Lists
 *     summary: Add items to an existing shopping list
 *     description: This endpoint allows adding new items to an existing shopping list by its name. It checks if the article exists in the shopping list and if there is enough stock available to add the item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listName:
 *                 type: string
 *                 description: The name of the shopping list to which the item is being added.
 *                 example: "Groceries"
 *               articles:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the article being added to the list.
 *                     example: "Laptop"
 *                   description:
 *                     type: string
 *                     description: A description of the article.
 *                     example: "15-inch laptop with 16GB RAM and 512GB SSD."
 *                   amount:
 *                     type: number
 *                     description: The amount of the article to be added to the list.
 *                     example: 1
 *     responses:
 *       200:
 *         description: Articles were successfully added to the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Articles were added"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: number
 *       400:
 *         description: Missing or invalid fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Name or Articles field missing."
 *       404:
 *         description: The shopping list with the given name was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Does not exist"
 *       409:
 *         description: The article already exists in the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article Already exists in List"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while writing files."
 */

/**
 * @swagger
 * /adjustArticleAmountInListByName:
 *   put:
 *     tags:
 *       - Shopping Lists
 *     summary: Adjust the amount of an article in a shopping list by its name
 *     description: This endpoint adjusts the amount of an article in a shopping list. The amount will be updated based on the available stock in the main shopping articles list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listName:
 *                 type: string
 *                 description: The name of the shopping list.
 *                 example: "Groceries"
 *               articleName:
 *                 type: string
 *                 description: The name of the article to adjust in the shopping list.
 *                 example: "Laptop"
 *               amount:
 *                 type: number
 *                 description: The new amount to set for the article in the shopping list.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Article amount adjusted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article adjusted successfully"
 *                 listAmountData:
 *                   type: number
 *                   description: The updated amount in the shopping list.
 *                   example: 2
 *                 articleAmountData:
 *                   type: number
 *                   description: The remaining amount in the main shopping articles.
 *                   example: 3
 *       400:
 *         description: Invalid or missing data in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List name cannot be empty"
 *       404:
 *         description: The list, article, or article in the main shopping articles was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article does not exist in the list"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to write to files."
 */

/**
 * @swagger
 * /deleteArticleInListByName:
 *   delete:
 *     tags:
 *       - Shopping Lists
 *     summary: Delete an article from a shopping list by its name
 *     description: This endpoint allows deleting a specific article from an existing shopping list by its name. It updates the list and adjusts the stock of the article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listName:
 *                 type: string
 *                 description: The name of the shopping list from which the article will be removed.
 *                 example: "Groceries"
 *               articleName:
 *                 type: string
 *                 description: The name of the article to be removed from the shopping list.
 *                 example: "Laptop"
 *               amount:
 *                 type: number
 *                 description: The amount of the article to be added back to the stock after deletion. Should be a positive number.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Article was successfully deleted from the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Articles were deleted"
 *       400:
 *         description: Missing or invalid fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name or Name field cannot be empty"
 *       404:
 *         description: The shopping list or article does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Does not exist"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to write to files."
 */

/**
 * @swagger
 * /deleteListsByName:
 *   delete:
 *     tags:
 *       - Shopping Lists
 *     summary: Delete a shopping list by its name
 *     description: This endpoint allows deleting a shopping list by its name. If the list exists, it is removed from the system and the updated list is saved.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the shopping list to be deleted.
 *                 example: "Groceries"
 *     responses:
 *       200:
 *         description: Shopping list was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Selected Lists were Deleted"
 *       400:
 *         description: Missing or invalid name for the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mesage:
 *                   type: string
 *                   example: "list field cannot be empty"
 *       404:
 *         description: The shopping list does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List does not exist"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while saving the data."
 */

/**
 * @swagger
 * /deleteAllItemsInListByName:
 *   delete:
 *     tags:
 *       - Shopping Lists
 *     summary: Delete all items in a shopping list by its name
 *     description: This endpoint deletes all items from a specific shopping list by its name. It also returns the updated stock amounts for the affected articles in the main shopping articles list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the shopping list from which to delete all items.
 *                 example: "Groceries"
 *     responses:
 *       200:
 *         description: All items were successfully deleted from the shopping list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Items Deleted"
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       articleName:
 *                         type: string
 *                       articleAmount:
 *                         type: number
 *                   description: A list of articles whose amounts were adjusted after deletion from the shopping list.
 *                   example:
 *                     - articleName: "Laptop"
 *                       articleAmount: 5
 *       400:
 *         description: Missing or invalid list name in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Name/Field cannot be empty"
 *       404:
 *         description: The shopping list with the specified name does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List Name does not exist"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to write to files."
 */

/**
 * @swagger
 * /deleteAllLists:
 *   delete:
 *     tags:
 *       - Shopping Lists
 *     summary: Delete all shopping lists
 *     description: This endpoint deletes all shopping lists stored in the system. It clears the entire shopping list data and removes all lists from the file.
 *     responses:
 *       200:
 *         description: All shopping lists were successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All lists have been deleted."
 *       404:
 *         description: No shopping lists exist to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no lists to delete."
 *       500:
 *         description: Internal server error while attempting to delete all lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to write to the file."
 */
