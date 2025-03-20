import React from "react";
import { useLists } from "../context/ListProvider";
import { Link } from "react-router-dom";
import "./allList.css";

const AllList: React.FC = () => {
  //call lists from useLists context to get the all the list objects 
  const { lists } = useLists();
  return (
    <div className="listView">
      <div className="linkNav">
        <Link to="/">Go To Shopping Lists</Link>
      </div>
      <div>
        <ul className="listNames">
          <h3 className="heading">Click to View List Info</h3>
          {lists.map((list) => (
            <li key={list.name}>
              <Link to={`/details/${list.name}`}>{list.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllList;
