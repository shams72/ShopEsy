import React from "react";
import Header from "./header/header";
import Articles from "./articles/articles";
import { Link } from "react-router-dom";

const ShoppingArticles: React.FC = () => {
  return (
    <div className="pageStructure">
      <div className="linkNav">
        <Link to="/">Go To Shopping Lists</Link>
      </div>
      <div className="gap"></div>
      <Header />
      <div style={{ marginTop: "20px" }}></div>
      <Articles />
    </div>
  );
};

export default ShoppingArticles;
