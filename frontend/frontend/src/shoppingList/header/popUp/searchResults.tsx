import React, { useEffect, useState } from "react";
import { ShoppingList } from "../../../types/types";
import SearchResultTable from "./searchResultsComponents/searchResultsTable";
import ArticlesInList from "./searchResultsComponents/articlesInList";
import ErrorView from "./searchResultsComponents/errorView";
import "./searchResults.css";
import { Button } from "@mui/material";

interface SearchResultsProps {
  inputSearch: string;
  searchType: string;
  setSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
}

//startting component for search resutls,the cprresponding child components will be called from here
const SearchResults: React.FC<SearchResultsProps> = ({
  inputSearch,
  searchType,
  setSearchBox,
}) => {
  const [lists, setLists] = useState<ShoppingList | null>(null);
  const [descLists, setDescLists] = useState<ShoppingList[] | null>(null);
  const [listNames, setListNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //useEffect to fetch web results on call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;

        if (searchType === "name") {
          response = await fetch(
            `/getShoppingListByName/${inputSearch.trim()}`
          );
          const result = await response.json();
          setLists(result.data);
          setError(false);
        } else if (searchType === "description") {
          if (inputSearch.trim() === "") {
            response = await fetch(`/getShoppingListByDescription/""`);
          } else {
            response = await fetch(
              `/getShoppingListByDescription/${inputSearch.trim()}`
            );
          }
          const result = await response.json();
          console.log(result.data);
          setDescLists(result.data);
          setError(false);
        } else if (searchType === "articles") {
          response = await fetch(
            `/getShoppingListsByNameOfArticle/${inputSearch.trim()}`
          );
          const result = await response.json();
          setListNames(result.data || []);
          setError(false);
        } else {
          throw new Error("Invalid search type.");
        }
        console.log(response);

        if (!response.ok) {
          console.log(inputSearch);
          setError(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
        } else {
          console.error("An unknown error occurred", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (inputSearch) {
      fetchData();
    }
  }, [searchType, inputSearch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="searchResults">
      <Button
        sx={{
          backgroundColor: "red",
          color: "white",
          border: "2px solid black",
        }}
        className="closeButton"
        onClick={() => setSearchBox(false)}
      >
        Close
      </Button>
      {error === true && <ErrorView searchType={searchType} />}
      {searchType === "name" && error === false && (
        <SearchResultTable list={lists} />
      )}
      {searchType === "description" &&
        error === false &&
        descLists?.map((list, index) => (
          <SearchResultTable key={index} list={list} />
        ))}
      {searchType === "articles" && error === false && (
        <ArticlesInList inputSearch={inputSearch} listNames={listNames} />
      )}
    </div>
  );
};

export default SearchResults;
