import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Article, ShoppingList } from "../types/types";

interface ListContextType {
  lists: ShoppingList[];
  loading: boolean;
  listName: string;
  setListName: React.Dispatch<React.SetStateAction<string>>;
  addNewList: (list: ShoppingList) => void;
  updateDeleteLists: (list_name: string) => void;
  editNameOfLists: (oldListName: string, newListName: string) => void;
  editDescriptionOfLists: (listName: string, newListDesc: string) => void;
  handleNewArticles: (list_name: string, newArticle: Article) => void;
  handleDeleteAllItems: (list_name: string) => void;
  handleDeleteAllLists: () => void;
  handleItemAmountChange: (
    list_name: string,
    articleName: string,
    amount: number
  ) => void;
  handleListItemsDeletion: (list_name: string, articleName: string) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);


export const ListsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [listName, setListName] = useState<string>("");
  
  //load lists on pageload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/getAllShoppingList");
        const result = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(result.data.shoppingLists);
        setLists(result.data.shoppingLists);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //add new list
  const addNewList = (list: ShoppingList) => {
    setLists((prevLists) => [...prevLists, list]);
  };
  
  //update list on deleltion
  const updateDeleteLists = (list_name: string) => {
    setLists((list) => list.filter((a) => a.name !== list_name));
  };
  
  //edit name of list
  const editNameOfLists = (oldListName: string, newListName: string) => {
    setLists((list) =>
      list.map((l) =>
        l.name === oldListName ? { ...l, name: newListName } : l
      )
    );
  };
  
  //edit description of shoppinglist
  const editDescriptionOfLists = (listName: string, newListDesc: string) => {
    setLists((list) =>
      list.map((l) =>
        l.name === listName ? { ...l, description: newListDesc } : l
      )
    );
  };
  
  //handles deleltion of all the list
  const handleDeleteAllLists = () => {
    setLists(() => []);//sets the list array empty
  };

  //add new articles to existig list
  const handleNewArticles = (list_name: string, newArticle: Article) => {
    setLists((lists) =>
      lists.map((list) =>
        list.name === list_name
          ? { ...list, items: [...list.items, newArticle] }
          : list
      )
    );
  };
  
  //deelte all articles in a list
  const handleDeleteAllItems = (list_name: string) => {
    setLists((lists) =>
      lists.map((list) =>
        list.name === list_name ? { ...list, items: [] } : list
      )
    );
  };

  //handle the amount chnage
  const handleItemAmountChange = (
    list_name: string,
    articleName: string,
    amount: number
  ) => {
    setLists((lists) =>
      lists.map((list) =>
        list.name === list_name
          ? {
              ...list,
              items: list.items.map((item) =>
                item.name === articleName ? { ...item, amount: amount } : item
              ),
            }
          : list
      )
    );
  };
   
  //deleltes he articles from  a list
  const handleListItemsDeletion = (list_name: string, articleName: string) => {
    setLists((lists) =>
      lists.map((list) =>
        list.name === list_name
          ? {
              ...list,
              items: list.items.filter((item) => item.name !== articleName),
            }
          : list
      )
    );
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        loading,
        listName,
        setListName,
        addNewList,
        updateDeleteLists,
        editNameOfLists,
        editDescriptionOfLists,
        handleNewArticles,
        handleListItemsDeletion,
        handleItemAmountChange,
        handleDeleteAllItems,
        handleDeleteAllLists,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useLists must be used within a ListsProvider");
  }
  return context;
};
