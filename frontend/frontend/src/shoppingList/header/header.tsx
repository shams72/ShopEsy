import React, { useState } from "react";
import { useLists } from "../../context/ListProvider";
import CreateList from "./popUp/createList";
import ViewArticles from "../popUp/viewArticles";
import SearchResults from "./popUp/searchResults";
import SearchBarForm from "./forms/searchBarForm";
import { Button, Select, MenuItem } from "@mui/material";
import "./header.css";

const Header: React.FC = () => {
  const {
    lists,
    listName,
    setListName,
    updateDeleteLists,
    handleDeleteAllLists,
  } = useLists();

  const [searchType, setSearchType] = useState<string>("name");
  const [searchBox, setSearchBox] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState(" ");
  const [addListBox, setAddListBox] = useState<boolean>(false);
  const [showListBox, setshowListBox] = useState<boolean>(false);

  //fubnction to delete all list
  const deleteAllList = async () => {
    try {
      const response = await fetch("/deleteAllLists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      handleDeleteAllLists(); //function to dleelte lists from the list array
    } catch (err) {
      console.error(err);
    }
  };

  //function to delete a particualrlist
  const deleteThisList = async () => {
    try {
      const response = await fetch("/deleteListsByName", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: listName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response);
      const result = await response.json();
      console.log(result);
      updateDeleteLists(listName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="headerStructure">
      <div className="headerFirstpart">
        <Button
          sx={{
            width: 140,
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "12px",
          }}
          onClick={() => setAddListBox(true)}
        >
          Create List
        </Button>
        <div className="adjustViewArticles">
          <div className="listName">
            <Select
              sx={{
                width: 240,
                height: 35,
                color: "black",
                borderRadius: "12px",
              }}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                {" "}
                <em>-- Select a List Name --</em>
              </MenuItem>
              {lists.map((list, index) => (
                <MenuItem key={index} value={list.name}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              sx={{
                width: 170,
                height: 35,
                backgroundColor: "#9C27B0",
                color: "white",
                borderRadius: "12px",
              }}
              className="headerButton viewButton"
              type="submit"
              onClick={() => setshowListBox(true)}
            >
              View ShoppingList
            </Button>
          </div>
        </div>
        <Button
          sx={{
            width: 250,
            height: 35,
            backgroundColor: "#9E1B32",
            color: "white",
            borderRadius: "12px",
          }}
          className="headerButton deleteThisButton"
          onClick={deleteThisList}
        >
          Delete This Shopping List
        </Button>
        <Button
          sx={{
            width: 170,
            height: 35,
            backgroundColor: "#E53935",
            color: "white",
            borderRadius: "12px",
          }}
          className="headerButton deleteAllButton"
          onClick={deleteAllList}
        >
          Delete All List
        </Button>
      </div>
      <SearchBarForm
        setSearchBox={setSearchBox}
        inputSearch={inputSearch}
        searchType={searchType}
        setSearchType={setSearchType}
        setInputSearch={setInputSearch}
      />
      <div className="popUp">
        <div>
          {searchBox === true && (
            <SearchResults
              inputSearch={inputSearch}
              searchType={searchType}
              setSearchBox={setSearchBox}
            />
          )}
        </div>
        <div className="listPop">
          {addListBox === true && <CreateList setAddListBox={setAddListBox} />}
        </div>
        {showListBox === true &&
          listName !== "-- Select a List Name --" &&
          listName !== "" && <ViewArticles setshowListBox={setshowListBox} />}
      </div>
    </div>
  );
};

export default Header;
