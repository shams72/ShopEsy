import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingList } from "../types/types";
import "../types/types";
import "./listDetails.css";
import SearchResultTable from "../shoppingList/header/popUp/searchResultsComponents/searchResultsTable";

const ListDetails: React.FC = () => {
  const { name } = useParams();//capture the name from the  router
  const [list, setLists] = useState<ShoppingList | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  console.log(name);
  //run useEffect on page load and fetch the list data using backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/getShoppingListByName/${name?.trim()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setLists(result.data);//set the list as shoppinglist object
        setError("");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="list-details">
      <div className="alignNav linkNav">
        <Link to="/">Go To Shopping Lists</Link>
        <Link to="/all-lists">View All Lists</Link>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {<SearchResultTable list={list} />}
    </div>
  );
};

export default ListDetails;
