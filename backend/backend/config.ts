//config file for testing and production
import * as dotenv from "dotenv";
import shoppingArticle from "../backend/src/data/shoppingArticles.json";
import shoppingList from "../backend/src/data/shoppingLists.json";

import shoppingArticlesTest from "../backend/test/testJSON/shoppingArticlesTest.json";
import shoppingListsTest from "../backend/test/testJSON/shoppingListTest.json";
dotenv.config();

const config = {
  production: process.env.IS_PRODUCTION === "true" ? true : false,

  articleFilePath:
    process.env.IS_PRODUCTION === "true"              //sets IS_PRODUCTION = true automatically on npm start and to false on npm test.check package.json in scripts
      ? "src/data/shoppingArticles.json"              //use main json db on production db start
      : "test/testJSON/shoppingArticlesTest.json",      ///else use test db 
  listFilePath:
    process.env.IS_PRODUCTION === "true"
      ? "src/data/shoppingLists.json"                   //set file path to production json db 
      : "test/testJSON/shoppingListTest.json",           //set file path to test json db 

  shoppingArticles:
    process.env.IS_PRODUCTION === "true"
      ? shoppingArticle                         //use this when in production
      : shoppingArticlesTest,                   //use this when in test

  shoppingLists:
    process.env.IS_PRODUCTION === "true" ? shoppingList : shoppingListsTest,
};

export default config;
