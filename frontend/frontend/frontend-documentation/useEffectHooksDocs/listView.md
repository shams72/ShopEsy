### `useEffect` in `ListDetails` component

The `useEffect` hook in the `ListDetails` component is used to fetch a shopping list from the backend when the component is loaded or when the `name` parameter from the URL (captured by `useParams`) changes. 

1. **Initial Setup**: The effect is triggered on the first render (component mount) and whenever the `name` changes, due to the dependency array `[name]`. This ensures that the component re-fetches the list data whenever the `name` parameter in the URL changes.

2. **Fetching Data**: Inside the effect, an asynchronous function `fetchData` is defined and immediately invoked. It sets the `loading` state to `true` before making a `GET` request to the backend endpoint `/getShoppingListByName/${name?.trim()}`, where `name` is the parameter captured using useParam() .

3. **Handling Response**: If the response is successful (status code 200), the `setLists` function updates the state with the shopping list data (`result.data`). 

This `useEffect` hook ensures that the component fetches data when the `name` changes and provides loading and error states for user feedback while the data is being fetched.

