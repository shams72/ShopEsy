import React from "react";
import { useArticles } from "./../../context/ArticleProvider";
import EditView from "../popUp/editView";
import { useState } from "react";
import "./articles.css";
import { Button } from "@mui/material";

interface Article {
  name: string;
  amount: number;
  description: string;
}

const Articles: React.FC = () => {
  const { articles, updateDeleteArticles } = useArticles(); //useArticle Context
  const [editArticle, setEditArticle] = useState<Article | null>(null);

  //deeeltes the article ny name from the shoppinglist
  const deleteArticles = async (articleName: string): Promise<void> => {
    try {
      const response = await fetch("/deleteArticlesByName", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: articleName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      updateDeleteArticles(result.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  return (
    <div className="adjustView">
      <div className="articleContainer">
        <div className="articleHeader">
          <div className="articleColumn">Name</div>
          <div className="articleColumn">Amount</div>
          <div className="articleColumn">Description</div>
          <div className="articleColumn">Actions</div>
        </div>
        <div className="articleBody">
          {articles.map((article: Article) => (
            <div key={article.name}>
              <div className="articleRow">
                <div className="articleCell">{article.name}</div>
                <div className="articleCell">{article.amount}</div>
                <div className="articleCell">{article.description}</div>
                <div className="articleCell adjustSpace">
                  <Button
                    sx={{
                      backgroundColor: "yellow",
                      color: "black",
                      border: "2px solid black",
                    }}
                    className="articleEdit"
                    onClick={() => setEditArticle(article)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "2px solid black",
                    }}
                    className="articleDelete"
                    onClick={() => deleteArticles(article.name)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              {editArticle === article && (
                <div className="editRow">
                  <EditView setEditArticle={setEditArticle} article={article} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
