# ArticlesContext Provider Documentation

The `ArticlesContext` is a context provider used to manage the state and actions related to articles (items) in a shopping list application. It offers functionality for interacting with articles, such as adding, deleting, editing, and modifying article amounts.

## Components

### `ArticlesProvider`
The `ArticlesProvider` is a wrapper component that uses the `ArticlesContext.Provider` to provide the context to all its child components. It manages the state for the articles and the actions to update, add, and delete articles.

#### Props

- `children: ReactNode`  
  The children elements that will be wrapped by the provider and have access to the context.

#### State

- `articles: Article[]`  
  An array of articles. Each article contains information like its name, description, and amount.

## `useEffect` in `ArticlesProvider`

In the `ArticlesProvider`, the `useEffect` hook is responsible for fetching the list of shopping articles when the component is first mounted. It makes an asynchronous request to the backend API to retrieve the shopping articles data.

#### Methods

- `updateArticles(quantity: number, operation: "increase" | "decrease")`  
  Increases or decreases the amount of a specific article by the given quantity.

- `addNewArticles(article: Article)`  
  Adds a new article to the `articles` state.

- `updateDeleteArticles(articleName: string)`  
  Deletes a specific article from the `articles` state by its name.

- `deleteAllArticles()`  
  Deletes all articles from the `articles` state.

- `editAmountOfArticles(articleName: string, newAmount: number)`  
  Edits the amount of a specific article.

- `editDescriptionOfArticles(articleName: string, newDescription: string)`  
  Edits the description of a specific article.

- `editNameOfArticles(oldName: string, newName: string)`  
  Edits the name of a specific article.

- `editAmountOfArticlesOnAddition(articleName: string, newAmount: number)`  
  Decreases the amount of an article when it is added to a shopping list.

- `editAmountOfArticlesfromListonDeletion(articleName: string, newAmount: number)`  
  Increases the amount of an article when it is removed from a shopping list.

### `useArticles`

The `useArticles` hook is used to access the context value inside any component wrapped by the `ArticlesProvider`. It provides access to the state and actions for managing articles.

