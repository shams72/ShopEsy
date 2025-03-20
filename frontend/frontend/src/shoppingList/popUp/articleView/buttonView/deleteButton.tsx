import React from "react";
import { useArticles } from "../../../../context/ArticleProvider";
import { useLists } from "../../../../context/ListProvider";
import { Button } from "@mui/material";

interface DeleteButtonProps {
  listName: string;
  articleName: string;
  amount: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  listName,
  articleName,
  amount,
}) => {
  const { handleListItemsDeletion } = useLists();
  const { editAmountOfArticlesfromListonDeletion } = useArticles();
  //delete an item fom the list
  const handleDeleteItem =
    (listName: string, itemName: string, amount: number) => async () => {
      try {
        const response = await fetch("/deleteArticleInListByName", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName: listName,
            articleName: itemName,
            amount: Number(amount),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        handleListItemsDeletion(listName, itemName);
        editAmountOfArticlesfromListonDeletion(itemName, Number(amount));
        console.log(result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

  return (
    <div>
      <Button
        sx={{
          height: 30,
          backgroundColor: "red",
          color: "white",
          border: "2px solid black",
        }}
        onClick={handleDeleteItem(listName, articleName, amount)}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteButton;
