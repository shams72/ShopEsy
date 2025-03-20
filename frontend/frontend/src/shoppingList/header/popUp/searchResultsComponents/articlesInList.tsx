import { Typography } from "@mui/material";
import React from "react";

interface ArticlesInlistProps {
  inputSearch: string;
  listNames: string[];
}

//components to showtheresults where it shows the name of list contaiing an artitcle
const ArticlesInList: React.FC<ArticlesInlistProps> = ({
  inputSearch,
  listNames,
}) => {
  return (
    <div>
      <Typography variant="h2" align="center"  
        sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
        {inputSearch} was found in:
      </Typography>
      {listNames.map((listName, index) => (
        <Typography key={index} variant="h4">
          {listName}
        </Typography>
      ))}
    </div>
  );
};

export default ArticlesInList;
