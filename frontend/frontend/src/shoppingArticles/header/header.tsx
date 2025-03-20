import React, { useState } from "react";
import { useArticles } from "./../../context/ArticleProvider";
import AddArticles from "./popUp/addArticles";
import IncreaseForm from "./forms/increaseForm";
import DecreaseForm from "./forms/decreaseForm";
import "./header.css";
import { Button } from "@mui/material";

const Header: React.FC = () => {
  const [articleWindow, setArticleWindow] = useState<boolean>(false);
  const { deleteAllArticles } = useArticles();

  //function to delelte all products
  const handleDeleteAllProducts = async (): Promise<void> => {
    try {
      const response = await fetch("/deleteAllArticles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      deleteAllArticles(); //delete products accordingly in shoppinglist object
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="arrangeForms">
        <Button
          sx={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "12px",
          }}
          className="noForm addButton"
          onClick={() => setArticleWindow(true)}
        >
          Add Products
        </Button>
        <IncreaseForm />
        <DecreaseForm />
        <Button
          sx={{
            width: 190,
            height: 40,
            backgroundColor: "maroon",
            color: "white",
            borderRadius: "12px",
          }}
          className="noForm delete"
          onClick={handleDeleteAllProducts}
        >
          Delete All Products
        </Button>
      </div>
      <div>
        {articleWindow && <AddArticles setArticleWindow={setArticleWindow} />}
      </div>
    </div>
  );
};

export default Header;
