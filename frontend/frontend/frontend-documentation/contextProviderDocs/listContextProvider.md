# ListsContext Provider Documentation

The `ListsContext` is a context provider used to manage the state and actions related to shopping lists in a React application. It provides functionality for interacting with shopping lists, such as adding, deleting, editing, and modifying list items.

## Components

### `ListsProvider`
The `ListsProvider` is a wrapper component that uses the `ListContext.Provider` to provide the context to all its child components. It manages the state for the lists, loading status, and selected list name.

#### Props

- `children: ReactNode`  
  The children elements that will be wrapped by the provider and have access to the context.

#### State

- `lists: ShoppingList[]`  
  An array containing all the shopping lists. Each list is an object that includes information like the list name, description, and items (articles).
  
- `loading: boolean`  
  A flag indicating whether the data is still being loaded from the backend.

- `listName: string`  
  A string representing the name of the currently selected shopping list.

#### `useEffect` in `ListsProvider`

In the `ListsProvider`, the `useEffect` hook is used to fetch the list of shopping lists from an API when the component is mounted (i.e., when the component is first rendered).


#### Methods

- `addNewList(list: ShoppingList)`  
  Adds a new shopping list to the `lists` state.

- `updateDeleteLists(list_name: string)`  
  Deletes a shopping list from the `lists` state by its name.

- `editNameOfLists(oldListName: string, newListName: string)`  
  Edits the name of an existing shopping list.

- `editDescriptionOfLists(listName: string, newListDesc: string)`  
  Edits the description of an existing shopping list.

- `handleNewArticles(list_name: string, newArticle: Article)`  
  Adds a new article to the specified shopping list.

- `handleDeleteAllItems(list_name: string)`  
  Deletes all articles from a specified shopping list.

- `handleDeleteAllLists()`  
  Deletes all shopping lists from the `lists` state.

- `handleItemAmountChange(list_name: string, articleName: string, amount: number)`  
  Updates the amount of a specific article in the shopping list.

- `handleListItemsDeletion(list_name: string, articleName: string)`  
  Deletes a specific article from the shopping list.

### `useLists`

The `useLists` hook is used to access the context value inside any component wrapped by the `ListsProvider`. It provides access to the state and actions for managing shopping lists.

