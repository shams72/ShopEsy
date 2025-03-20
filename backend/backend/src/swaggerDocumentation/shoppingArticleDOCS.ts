/**
 * @swagger
 * tags:
 *   - name: Shopping Articles
 *     description: API for managing shopping articles
 *   - name: Shopping Lists
 *     description: API for managing shopping lists
 */

/**
 * @swagger
 * /getAllShoppingArticles:
 *   get:
 *     tags:
 *       - Shopping Articles
 *     summary: Retrieve all shopping articles
 *     responses:
 *       200:
 *         description: A list of shopping articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shoppingArticles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       amount:
 *                         type: number
 */

/**
 * @swagger
 * /createShoppingArticle:
 *   post:
 *     summary: Create a new shopping article
 *     description: Adds a new shopping article to the list if it passes validation checks.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the shopping article.
 *                 example: "Milk"
 *               description:
 *                 type: string
 *                 description: Description of the shopping article.
 *                 example: "A carton of whole milk"
 *               amount:
 *                 type: number
 *                 description: Quantity of the article.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Article added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article added successfully"
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
 *         description: Validation errors for the article data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Article name is required"
 *       409:
 *         description: Article already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Article already exists"
 *       500:
 *         description: Internal server error while saving data.
 */

/**
 * @swagger
 * /editNameOfArticles:
 *   put:
 *     summary: Edit the name of an existing shopping article
 *     description: Updates the name of an existing article if it exists and the new name is valid.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - newName
 *             properties:
 *               name:
 *                 type: string
 *                 description: The current name of the article to be updated.
 *                 example: "Milk"
 *               newName:
 *                 type: string
 *                 description: The new name for the article.
 *                 example: "Skim Milk"
 *     responses:
 *       200:
 *         description: Article name successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Selected articles were changed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     newName:
 *                       type: string
 *       400:
 *         description: Validation error, such as missing name or new name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Article name is required"
 *       404:
 *         description: The article with the given name does not exist or the new name is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name does not exist"
 *       409:
 *         description: The new name already exists for another article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name already exists"
 */

/**
 * @swagger
 * /editDescriptionOfArticles:
 *   put:
 *     summary: Edit the description of an existing shopping article
 *     description: Updates the description of an existing article if the article exists and the new description is valid.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The current name of the article to update.
 *                 example: "Milk"
 *               description:
 *                 type: string
 *                 description: The new description for the article.
 *                 example: "A carton of fresh skim milk"
 *     responses:
 *       200:
 *         description: Article description successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Selected articles were changed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Validation error, such as missing name or description.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article Description cannot be empty"
 *       404:
 *         description: The article with the given name does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article with this Name does not exist"
 *       409:
 *         description: The description is already up to date, or other conflict.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article Description is already up-to-date"
 */

/**
 * @swagger
 * /adjustAmountByName:
 *   put:
 *     summary: Adjust the amount of a shopping article by name
 *     description: Updates the amount of an existing article, provided the article exists and the amount is valid.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the article whose amount you want to change.
 *                 example: "Milk"
 *               amount:
 *                 type: number
 *                 description: The new amount for the article (should be a positive number).
 *                 example: 10
 *     responses:
 *       200:
 *         description: Article amount successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article amount updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *       400:
 *         description: Validation error, such as missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter a Positive Number"
 *       404:
 *         description: The article with the given name does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article doesn't exist"
 *       500:
 *         description: Internal server error while saving data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save data"
 */

/**
 * @swagger
 * /increaseAllArticles:
 *   put:
 *     summary: Increase the amount of all shopping articles by a specified value
 *     description: This endpoint allows the user to increase the amount of all shopping articles by a specified value.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - increaseAmount
 *             properties:
 *               increaseAmount:
 *                 type: number
 *                 description: The amount by which to increase all articles' amount.
 *                 example: 5
 *     responses:
 *       200:
 *         description: All articles were successfully increased.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Articles were increased by 5"
 *       400:
 *         description: Validation error, such as invalid or missing `increaseAmount`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter a valid number, not a string"
 *       500:
 *         description: Internal server error while saving the updated article data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save data"
 */

/**
 * @swagger
 * /decreaseAllArticles:
 *   put:
 *     summary: Decrease the amount of all shopping articles by a specified value
 *     description: This endpoint allows the user to decrease the amount of all shopping articles by a specified value. If the resulting amount is less than 0, the amount will be set to 0.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - decreaseAmount
 *             properties:
 *               decreaseAmount:
 *                 type: number
 *                 description: The amount by which to decrease all articles' amount.
 *                 example: 3
 *     responses:
 *       200:
 *         description: All articles were successfully decreased.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Articles were decreased by 3"
 *       400:
 *         description: Validation error, such as invalid or missing `decreaseAmount`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please enter a valid number, not a string"
 *       500:
 *         description: Internal server error while saving the updated article data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save data"
 */

/**
 * @swagger
 * /deleteArticlesByName:
 *   delete:
 *     summary: Delete a specific article by its name
 *     description: This endpoint allows the user to delete a shopping article by its name.
 *     tags:
 *       - Shopping Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the article to delete.
 *                 example: "Milk"
 *     responses:
 *       200:
 *         description: Article was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article Deleted"
 *                 data:
 *                   type: string
 *                   example: "Milk"
 *       400:
 *         description: Bad request, article name is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Milk"
 *                 message:
 *                   type: string
 *                   example: "Article name is required"
 *       404:
 *         description: Article not found with the provided name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article Doesnot Exist"
 *       500:
 *         description: Internal server error while deleting the article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save data"
 */

/**
 * @swagger
 * /deleteAllArticles:
 *   delete:
 *     summary: Delete all articles
 *     description: This endpoint allows the user to delete all shopping articles from the system.
 *     tags:
 *       - Shopping Articles
 *     responses:
 *       200:
 *         description: All articles were successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All articles have been deleted."
 *       404:
 *         description: No articles found to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no articles to delete."
 *       500:
 *         description: Internal server error while deleting the articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save data"
 */
