# Backend Typescript - FWE 1118070

## Overview
Backend API for shopping articles and shopping lists. Both the data types are stored in a json file.

### 1. To install all the dependencies for the backend, run:
```bash
npm install
```
### 2. After installing the dependencies, start the backend using:
```bash
npm start
``` 

### 3. To run the automated tests for backend(implememtned using Jest and Supertest):
```bash
npm test
```

### 4. To view the backend documentation using Swagger, visit:
```http
http://localhost:8087/api-docs
```

### 5. Tools Used in Backend:

- **helmet** - A middleware used to enhance the security of the application by setting various HTTP headers, helping to protect against common web vulnerabilities.
- **cors** - A middleware that enables Cross-Origin Resource Sharing, allowing the frontend to communicate securely with the backend across different origins.
- **zod** -  A TypeScript-first validation library that allows for the definition of strict schemas for validating and parsing data. It provides runtime type checking, ensuring that incoming data meets specific requirements and helping to avoid runtime errors by enforcing data consistency.
- **fs** - A Node.js module used for file system operations, such as reading from or writing to JSON files, allowing the application to manage data storage or configuration files effectively.**(Used since Shopping Articles and Shopping Lists are stored in JSON file)**

### 6. Small Program Files Overview:

- `/src/middlewares/` contains all the TypeScript files for the middleware validation check using Zod.
- `/src/routes/` contains all the TypeScript routes for the middleware validation check.
- `/src/controllers/` also contains all the TypeScript files for the controller logic.
- `/src/data/` also contains all the json files maintained as database.
- `/test/` contains all the tests.


### 7. Click the links below to view the backend documentation in Markdown:

[Click Here To view shopping articles documentation](api-documenatation/shopping-article-documentation.md)

[Click Here To view shopping lists documentation](api-documenatation/shopping-lists-documentation.md)

[Click Here To view shopping lists validation middleware documentation](api-documenatation/shopping-list-middleware.md)

[Click Here To view shopping article validation middleware documentation](api-documenatation/shopping-article-middleware.md)

[Click Here To view Test documentation](api-documenatation/tests_documenation.md)

> **Note**  
> The description in the shopping list is optional and can be left empty.

### 8. **Freestyle Task:**

#### **Task 1: Increment/Decrement All Articles**

As part of **Freestyle Task 1**, the application includes a feature that allows users to increase or decrease the quantity of all articles at once by a specified amount.

**Endpoints:**

- **Increase all articles**:
  ```http
  PUT /increaseAllArticles
  ```

- **Decrease all articles**:

   ```http
    PUT /decreaseAllArticles
   ```

#### **Task 2: External API Integration**  
   
For Freestyle Task 2, the application integrates with an external API to enable web search for articles. This feature is accessible via a one-click button.

**Endpoints:**

- **Search articles on the web by name:**

   ```http
    GET /resultsFromTheWeb/{name}
   ```
   > **Note**  
   > The API Key can be found in the .env file.




