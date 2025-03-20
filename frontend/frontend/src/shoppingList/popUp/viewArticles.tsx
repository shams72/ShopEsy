import React, { useState } from "react";
import { useLists } from "./../../context/ListProvider";
import { useArticles } from "./../../context/ArticleProvider";
import { Article, ShoppingList } from "../../types/types";
import ArticleView from "./articleView/articleView";
import NameChangeForm from "./forms/nameChangeForm";
import DescriptionChangeForm from "./forms/descriptionChangeForm";
import { Button, Alert } from "@mui/material";

import "./viewArticles.css";

interface ViewArticlesProps {
  setshowListBox: React.Dispatch<React.SetStateAction<boolean>>;
}

//component to view Aerticels
const ViewArticles: React.FC<ViewArticlesProps> = ({ setshowListBox }) => {
  const { lists, listName, handleDeleteAllItems } = useLists();
  const { editAmountOfArticles } = useArticles();
  const [error, setError] = useState<boolean | null>(null);
  const currentList: ShoppingList | undefined = lists.find(
    (item) => item.name === listName
  );
  const currentListItems: Article[] | undefined = currentList?.items;

  //handle delete all items froma lost
  const handleDeleteAllItem = async () => {
    try {
      const response = await fetch("/deleteAllItemsInListByName", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: listName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      for (let i = 0; i < result.articles.length; i++) {
        const articleName = result.articles[i].articleName;
        const articleAmount = result.articles[i].articleAmount;
        editAmountOfArticles(articleName, articleAmount);
      }
      handleDeleteAllItems(listName);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="viewArticles">
      <div className="arrangeButtons">
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAllItem}
          id="deleteButton"
        >
          Delete All Items
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setshowListBox(false)}
          id="closeButton"
        >
          Close
        </Button>
      </div>
      <div className="arrangeArticleViewContents">
        <div className="arrangeViewContents">
          <div className="arrangeForms">
            <NameChangeForm setError={setError} />
            <DescriptionChangeForm description={currentList?.description} />
          </div>
          <ArticleView
            currentList={currentList}
            currentListItems={currentListItems}
          />
        </div>
        {error && (
          <Alert severity="error" className="error-message" sx={{ mt: 2 }}>
            List with this name already exists
          </Alert>
        )}
        {error === false && (
          <Alert severity="success" className="error-message" sx={{ mt: 2 }}>
            List Named Changed
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ViewArticles;
