import React from "react";
import { useArticles } from "../../../context/ArticleProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./arrangeForms.css";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";

const DecreaseForm: React.FC = () => {
  const { updateArticles } = useArticles();

  const initialValues = {
    decreaseQuantity: 0,
  };

  const validationSchema = Yup.object({
    decreaseQuantity: Yup.number()
      .required("Decreased amount is required")
      .min(1, "Decreased amount must be at least 1"),
  });

  //decrease all products on a click
  const handleDecreaseAllProducts = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch("/decreaseAllArticles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decreaseAmount: values.decreaseQuantity }), //decrease Amount
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      updateArticles(values.decreaseQuantity, "decrease"); //update changes in shoppinglist from frontend
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleDecreaseAllProducts}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="arrangeQuantity">
              <label htmlFor="decreaseQuantity">Decreased Amount:</label>
              <Field
                type="number"
                id="decreaseQuantity"
                name="decreaseQuantity"
                placeholder="Decreased Amount:"
              />
              <Button
                sx={{
                  width: 230,
                  height: 28,
                  backgroundColor: "#5DADE2",
                  color: "white",
                  borderRadius: "12px",
                  border: "2px solid black",
                }}
                className="FormButton"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Decrease All Products"}
              </Button>
            </div>
            <ErrorMessage
              name="decreaseQuantity"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DecreaseForm;
