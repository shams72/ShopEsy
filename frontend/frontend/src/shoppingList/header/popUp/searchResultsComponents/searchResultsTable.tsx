import React from "react";
import { ShoppingList } from "../../../../types/types";
import ResultsTable from "./tables/resultsTable";
import { Typography } from "@mui/material";

interface SearchResultTableProps {
  list: ShoppingList | null;
}

//component to view search resutls
const SearchResultTable: React.FC<SearchResultTableProps> = ({ list }) => {
  return (
    <div>
      <div key={list?.name} className="align-table">
        <div className="alignHeaders">
          <Typography variant="h4"  sx={{ fontWeight: 650 ,marginBottom:2}} className="list-title">
            List Name: {list?.name}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600,marginBottom:2 }} className="list-description">
            List Description: {list?.description || "No Description"}
          </Typography>

          <Typography variant="h6"  sx={{ fontWeight: 600 }} className="creation-date">
            Creation Date: {list?.creationDate}
          </Typography>
        </div>
        <ResultsTable list={list} />
      </div>
    </div>
  );
};

export default SearchResultTable;
