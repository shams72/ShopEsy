import { useLists } from "../../../context/ListProvider";
import { useArticles } from "../../../context/ArticleProvider";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";
interface ArticleProps {
  article: { name: string; description: string; amount: number };
}

const ArticleEntryForm: React.FC<ArticleProps> = ({ article }) => {
  const { listName, lists, handleNewArticles } = useLists();
  const { editAmountOfArticlesOnAddition } = useArticles();

  const initialValues = {
    amount: 0,
  };

  const validationSchema = Yup.object({
    amount: Yup.number().min(1, "Decreased amount must be at least 1"),
  });

  //handle all the article additin to a list
  const handleArticles =
    (name: string, description: string) =>
    async (
      values: typeof initialValues,
      { resetForm }: FormikHelpers<typeof initialValues>
    ) => {
      const inputAmount = values.amount;
      console.log(inputAmount);

      try {
        const response = await fetch("/addItemsToExistingListByName", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName: listName,
            articles: {
              name: name,
              description: description,
              amount: inputAmount,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        editAmountOfArticlesOnAddition(result.data.name, result.data.amount); //adjust article amount on addition
        handleNewArticles(listName, result.data); //update addition of articles
        resetForm();
      } catch (err) {
        console.error("Error occurred while fetching:", err);
      }
    };

  //function to disable the insertion of articles in the article page if article already ecists in main page
  const showInput = (list_name: string, articleName: string): string => {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].name === list_name) {
        for (let j = 0; j < lists[i].items.length; j++) {
          if (lists[i].items[j].name === articleName) {
            return "disabled";
          }
        }
      }
    }
    return "";
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleArticles(article.name, article.description)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="articleForm">
              <Field
                type="number"
                name="amount"
                placeholder="Enter Desired Amount"
                min="0"
                disabled={showInput(listName, article.name) === "disabled"}
              />
              <Button
                sx={{ backgroundColor: "blue", color: "white" }}
                className="buttonColor"
                type="submit"
                value="Submit"
                disabled={showInput(listName, article.name) === "disabled"}
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            </div>
            <ErrorMessage
              name="amount"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticleEntryForm;
