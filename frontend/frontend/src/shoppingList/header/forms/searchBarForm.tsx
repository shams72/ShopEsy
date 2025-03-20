import React from "react";
import { Formik, Form, Field } from "formik";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import DOMPurify from "dompurify";
import { Button } from "@mui/material";

interface SearchBarFormProps {
  setSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
  inputSearch: string;
  searchType: string;
}

const SearchBarForm: React.FC<SearchBarFormProps> = ({
  setSearchBox,
  inputSearch,
  searchType,
  setSearchType,
  setInputSearch,
}) => {
  const initialValues = {
    searchType: searchType || "",
    inputSearch: inputSearch || "",
  };

  const handleSearchForm = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    setSearchType(DOMPurify.sanitize(values.searchType)); //set for the search type
    setInputSearch(DOMPurify.sanitize(values.inputSearch)); // set the text to be searched
    setSearchBox(true); //set search box
    resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSearchForm}>
        {({ isSubmitting }) => (
          <Form>
            <div className="search">
              <div className="formContentArrangement">
                {/* Text Input Field */}
                <Field
                  className="searchBar"
                  type="text"
                  placeholder="Search Your Lists......"
                  name="inputSearch" // Matches initialValues key
                />

                <Field
                  as="select" // Renders Field as a <select>
                  name="searchType" // Matches initialValues key
                  className="searchTypeSelect"
                >
                  <option value="name">Search Lists By Name</option>
                  <option value="description">
                    Search Lists By Description
                  </option>
                  <option value="articles">Search Lists By Articles</option>
                </Field>
              </div>
              <Button
                sx={{
                  backgroundColor: "yellow",
                  color: "black",
                  borderRadius: "12px",
                  border: "2px solid black",
                }}
                className="searchButton"
                type="submit"
              >
                {isSubmitting}Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBarForm;
