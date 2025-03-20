import React from "react";
import "./errorView.css"
import { Alert, Typography } from "@mui/material";

interface ErrorViewProps {
  searchType: string;
}
//compionenet which shows error if error occurs based on search type selelction
const ErrorView: React.FC<ErrorViewProps> = ({ searchType }) => {
  return (
    <div>
       <Typography 
        variant="h4" 
        align="center" 
        sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 3 }}
      >
        There was an error in your entry:
      </Typography>
      {searchType === 'name' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            List Not Found:
          </Typography>{' '}
          The list you searched does not exist.
        </Alert>
      )}
      {searchType === 'description' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography component="span" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            Description Not Found:
          </Typography>{' '}
          The description you searched does not exist.
        </Alert>
      )}
      {searchType === 'articles' && (
        <Alert severity="error">
          <Typography component="span" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            Article Not Found:
          </Typography>{' '}
          The article you searched does not exist in any list.
        </Alert>
      )}
    </div>
  );
};

export default ErrorView;
