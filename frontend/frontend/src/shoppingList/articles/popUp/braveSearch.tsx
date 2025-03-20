import React, { useEffect, useState } from "react";

import "./braveSearch.css";
import { Button, Typography } from "@mui/material";

interface BraveSearchProps {
  setSearchResults: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
}
interface webSearch {
  title: string;
  url: string;
}

const BraveSearch: React.FC<BraveSearchProps> = ({
  setSearchResults,
  name,
}) => {
  const [webSearchResults, setwebSearchResults] = useState<webSearch[]>([]);

  //load the search on component call
  useEffect(() => {
    const fetchData = async () => {
      console.log(name);
      try {
        const response = await fetch(`/resultsFromTheWeb/${name}`);

        const result = await response.json();
        setwebSearchResults(result.data);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: +${response.status}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      }
    };
    fetchData();
  }, [name]);

  return (
    <div className="viewLinks">
      <Button onClick={() => setSearchResults(null)}>Close</Button>
      {webSearchResults.map((result, index) => (
        <div key={index}>
          <Typography
            variant="h6"
            sx={{ color: "#333", marginBottom: "8px", fontWeight: "bold" }}
          >
            {result.title}
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href={result.url}
            sx={{
              color: "#1e88e5", // Link color
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Link to website
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default BraveSearch;
