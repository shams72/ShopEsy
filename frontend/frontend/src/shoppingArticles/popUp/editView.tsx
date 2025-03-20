import React, { useState } from "react";
import { useArticles } from "../../context/ArticleProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./editView.css";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";

interface Article {
  name: string;
  description: string;
  amount: number;
}

interface EditArticlesProps {
  setEditArticle: React.Dispatch<React.SetStateAction<Article | null>>;
  article: Article;
}

const EditView: React.FC<EditArticlesProps> = ({ setEditArticle, article }) => {
  const [error, setError] = useState<boolean>(false);
  const {
    editAmountOfArticles,
    editDescriptionOfArticles,
    editNameOfArticles,
  } = useArticles();

  const initialValues = {
    desc: "",
    name: "",
    quantity: 0,
  };

  const validationSchema = Yup.object({
    quantity: Yup.number().typeError("Quantity must be a number"),
  });
  //handle name update
  const handleNameUpdate = async (values: typeof initialValues) => {
    try {
      const response = await fetch("/editNameOfArticles", {
        //send request to edit name
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: article.name, newName: values.name }),
      });

      if (!response.ok) {
        //if response other than 200
        setError(true);
      } else {
        const result = await response.json();
        console.log(result);

        editNameOfArticles(article.name, result.data.newName); //update the article if succesfully updatein backend
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  //handledescription update
  const handleDescriptionUpdate = async (values: typeof initialValues) => {
    try {
      const response = await fetch("/editDescriptionOfArticles", {
        // change list description
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: article.name, description: values.desc }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      editDescriptionOfArticles(article.name, result.data.description); //edt description in frntend
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  //handleamoutn chage in list object
  const handleAmountUpdate = async (values: typeof initialValues) => {
    try {
      const response = await fetch("/adjustAmountByName", {
        //change in json file in backend
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: values.quantity, name: article.name }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        editAmountOfArticles(article.name, result.data.amount);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  //handle the edit in article object
  const handleEdit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    if (values.name && (values.desc || values.quantity)) {
      const promises = [];
      if (values.desc) {
        promises.push(handleDescriptionUpdate(values));
      }
      if (values.quantity) {
        promises.push(handleAmountUpdate(values));
      }
      await Promise.all(promises);

      if (values.name) {
        await handleNameUpdate(values);
        resetForm();
      }
    } else if (values.name) {
      await handleNameUpdate(values);
      resetForm();
    } else if (values.desc) {
      await handleDescriptionUpdate(values);
      resetForm();
    } else if (values.quantity) {
      await handleAmountUpdate(values);
      resetForm();
    }
  };

  return (
    <div className="editView">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleEdit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="editFields">
              <div className="editField">
                <Field
                  type="text"
                  id="new Name"
                  name="name"
                  placeholder="New Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <div className="editField">
                <Field
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="New Amount"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <div className="editField">
                <Field
                  type="text"
                  id="desc"
                  name="desc"
                  placeholder="New Description"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="errorMessage"
                />
              </div>
            </div>
            <div className="editActions">
              <div className="editButtons">
                <Button
                  sx={{
                    background: "lightgreen",
                    width: 180,
                    height: 30,
                    color: "black",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  sx={{
                    background: "red",
                    width: 180,
                    height: 30,
                    color: "white",
                  }}
                  className="cancelButton"
                  onClick={() => setEditArticle(null)}
                >
                  Cancel
                </Button>
              </div>
              {error && (
                <div className="errorMessage">
                  <p>Article with this name already exists</p>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditView;
