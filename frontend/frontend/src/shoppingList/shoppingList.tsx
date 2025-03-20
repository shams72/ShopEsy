import React from "react";
import { Link } from "react-router-dom";
import Header from "./header/header";
import Articles from "./articles/articles";
import "./shoppingList.css";

const ShoppingList = () => {
  return (
    <div className="pageStructure">
      <div className="links linkNav">
        <Link to="/shoppingArticles">Go To Shopping Articles</Link>
        <Link to="/all-lists">View All Lists</Link>
      </div>
      {<Header />}
      {<Articles />}
    </div>
  );
};

export default ShoppingList;
