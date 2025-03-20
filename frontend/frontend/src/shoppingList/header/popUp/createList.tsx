import React from "react";
import { useState } from "react";
import CreateListForm from "../forms/createListForm";
import { Typography, Box, Button, Alert, Card, CardContent } from "@mui/material";
import "./createList.css";

interface CreateListProps {
  setAddListBox: React.Dispatch<React.SetStateAction<boolean>>;
}

//component to create a list
const CreateList: React.FC<CreateListProps> = ({ setAddListBox }) => {
  const [error, setError] = useState<boolean | null>(null);

  return (
    <Box
    className="listMainBox viewPop"
  >
    {/* Heading */}
    <Typography variant="h4" align="center" gutterBottom>
      Enter List Details
    </Typography>

    {/* Form Container */}
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <div className="createListBox">
          <CreateListForm
            setAddListBox={setAddListBox}
            setError={setError}
            /* form to create a list */
          />
        </div>
      </CardContent>
    </Card>

    {/* Close Button */}
    <Button
      variant="contained"
      color="error"
      sx={{ mt: 2 }}
      onClick={() => setAddListBox(false)}
    >
      Close
    </Button>

    {/* Error and Success Messages */}
    {error && (
      <Alert severity="error" sx={{ mt: 2 }}>
        List with this name already exists
      </Alert>
    )}
    {error === false && (
      <Alert severity="success" sx={{ mt: 2 }}>
        List Created
      </Alert>
    )}
  </Box>
  );
};

export default CreateList;
