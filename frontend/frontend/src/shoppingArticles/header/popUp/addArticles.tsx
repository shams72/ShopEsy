import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useArticles } from "../../../context/ArticleProvider";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import "./addArticles.css";
import DOMPurify from "dompurify";
import { Alert, Button } from "@mui/material";
interface AddArticlesProps {
  setArticleWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddArticles: React.FC<AddArticlesProps> = ({ setArticleWindow }) => {
  const { addNewArticles } = useArticles();

  const [success, setSuccess] = useState<boolean | null>(null);

  const initialValues = {
    name: "",
    description: "",
    amount: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Article name is required")
      .min(2, "Name must be at least 2 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be at least 1"),
  });

  //function to send a post request to backend andd updateaccordingly in the shoppinglist array
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch("/createShoppingArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: DOMPurify.sanitize(values.name),
          description: DOMPurify.sanitize(values.description),
          amount: values.amount,
        }),
      });

      if (!response.ok) {
        setSuccess(false);

        console.log("name", "Article with this name already exists");
      } else {
        const result = await response.json();
        addNewArticles(result.data); //shopping list array
        setSuccess(true);
        resetForm(); //reset form after submit
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      console.log("hello");
    }
  };

  return (
    <div className="viewPop">
      <div className="arrangeCreateArticleForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="arrangeAddForms">
              <div className="formContainer">
                <div className="formField">
                  <label htmlFor="name">Article Name:</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Article Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="formField">
                  <label htmlFor="amount">Article Amount:</label>
                  <Field
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Article Amount"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="formField">
                  <label htmlFor="description">Article Description:</label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder="Article Description"
                    className="arrangeDescription"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="buttonContainer">
                  <Button
                    sx={{
                      backgroundColor: "lightgreen",
                      color: "black",
                      border: "2px solid black",
                    }}
                    type="submit"
                    className="saveButtons"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "2px solid black",
                    }}
                    type="button"
                    className="roundedButtons"
                    onClick={() => setArticleWindow(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {success === true && (
          <Alert severity="success">Article Added succesfully</Alert>
        )}
        {success === false && (
          <Alert severity="error">Article With this name already exist</Alert>
        )}
      </div>
    </div>
  );
};

export default AddArticles;
