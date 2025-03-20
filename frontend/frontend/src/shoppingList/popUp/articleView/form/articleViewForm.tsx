import React from "react";
import { useLists } from "../../../../context/ListProvider";
import { useArticles } from "../../../../context/ArticleProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./articleViewForm.css";
import * as Yup from "yup";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";

interface ArticleViewFormProps {
  name: string;
}

const ArticleViewForm: React.FC<ArticleViewFormProps> = ({ name }) => {
  const { handleItemAmountChange, listName } = useLists();
  const { editAmountOfArticles } = useArticles();
  const initialValues = {
    amount: 0,
  };

  const validationSchema = Yup.object({
    amount: Yup.number().min(1, "Decreased amount must be at least 1"),
  });

  //handle amount edit
  const handleAmountEdit =
    (articleName: string) =>
    async (
      value: typeof initialValues,
      { resetForm }: FormikHelpers<typeof initialValues>
    ) => {
      const amount = Number(value.amount);

      try {
        const response = await fetch("/adjustArticleAmountInListByName", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName: listName,
            articleName: articleName,
            amount: Number(amount),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        handleItemAmountChange(listName, articleName, result.listAmountData); //handle item amount change in list
        editAmountOfArticles(articleName, result.articleAmountData); // reflect the changes in article srray
        console.log(result);
        resetForm();
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAmountEdit(name)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="search">
                <div className="formContentArrangement">
                  {/* Text Input Field */}
                  <Field
                    type="number"
                    name="amount"
                    placeholder="Change Amount"
                  />

                  <Button
                    sx={{
                      height: 30,
                      backgroundColor: "yellow",
                      color: "white",
                      border: "2px solid black",
                    }}
                    id="submitButton"
                    type="submit"
                  >
                    {isSubmitting}Submit
                  </Button>
                </div>
              </div>
              <ErrorMessage
                name="amount"
                component="div"
                className="error-message"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticleViewForm;
