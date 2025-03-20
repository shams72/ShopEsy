import React, { useState } from "react";
import { useArticles } from "../../context/ArticleProvider";
import "./articles.css";
import ArticleEntryForm from "./forms/articleEntryForm";
import BraveSearch from "./popUp/braveSearch";
import { Button, Typography } from "@mui/material";

//component for each article view
const Articles: React.FC = () => {
  const { articles } = useArticles();
  const [searchResults, setSearchResults] = useState<string | null>(null);

  return (
    <div className="articles">
      {articles
        .filter((article) => article.amount > 0)
        .map((article, index) => (
          <div className="article" key={index}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ paddingBottom: "8px", fontWeight: "bold", color: "#333" }}
            >
              {article.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ paddingBottom: "4px", color: "#555" }}
            >
              {article.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "#777" }}>
              Amount: {article.amount}
            </Typography>
            <ArticleEntryForm
              article={article} /*article form to enter artcle in list*/
            />
            {searchResults === article.name && (
              <BraveSearch //brave search button
                setSearchResults={setSearchResults}
                name={article.name}
              />
            )}
            <Button
              sx={{
                height: 35,
                textTransform: "none",
                color: "white",
                backgroundColor: "#FF6F00",
                fontFamily: "Georgia', serif",
                borderRadius: "8px",
              }}
              className="braveSearchButton"
              onClick={() => setSearchResults(article.name)}
            >
              Search This Article with Brave Search
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Articles;
