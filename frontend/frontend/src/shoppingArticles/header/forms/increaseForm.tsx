import React from "react";
import { useArticles } from "../../../context/ArticleProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./arrangeForms.css";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";

const IncreaseForm: React.FC = () => {
  const { updateArticles } = useArticles();

  const initialValues = {
    increaseQuantity: 0,
  };

  const validationSchema = Yup.object({
    increaseQuantity: Yup.number()
      .required("increased amount is required")
      .min(1, "increased amount must be at least 1"),
  });

  //increases all product on a click
  const handleIncreaseAllProducts = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch("/increaseAllArticles", {
        //fetch the datat frobackend
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increaseAmount: values.increaseQuantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      updateArticles(values.increaseQuantity, "increase"); //update accordinglyin shoppinglist
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
        onSubmit={handleIncreaseAllProducts}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="arrangeQuantity">
              <div>
                <label htmlFor="increaseQuantity">Increased Amount:</label>
                <Field
                  type="number"
                  id="increaseQuantity"
                  name="increaseQuantity"
                  placeholder="increased Amount:"
                />
              </div>
              <Button
                sx={{
                  width: 230,
                  height: 28,
                  backgroundColor: "orange",
                  color: "white",
                  borderRadius: "12px",
                  border: "2px solid black",
                }}
                className="FormButton"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "increase All Products"}
              </Button>
            </div>
            <ErrorMessage
              name="increaseQuantity"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IncreaseForm;
