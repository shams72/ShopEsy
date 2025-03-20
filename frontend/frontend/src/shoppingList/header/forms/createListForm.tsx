import React from "react";
import { useLists } from "../../../context/ListProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button } from "@mui/material";

interface CreateListFormProps {
  setAddListBox: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CreateListForm: React.FC<CreateListFormProps> = ({
  setAddListBox,
  setError,
}) => {
  const { addNewList } = useLists();

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name Cannot be Empty"),
  });

  //handle new list addistion **inserts a list with empty articles list
  const handleNewList = async (
    value: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch("/createShoppingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name,
          description: value.description,
          item: [],
        }),
      });

      if (!response.ok) {
        setAddListBox(true);
        setError(true);
        resetForm();
      } else {
        const result = await response.json();
        console.log(result);
        addNewList(result.data);
        setError(false);
        resetForm();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred", error);
      }
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleNewList}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="articleForm">
              <Field type="text" name="name" placeholder="Enter List Name" />
              <Field
                as="textarea"
                type="text"
                name="description"
                placeholder="Enter List Description"
              />
              <Button
                sx={{
                  width: 180,
                  backgroundColor: "yellow",
                  color: "black",
                  borderRadius: "12px",
                  border: "2px solid black",
                }}
                type="submit"
                className="submitButton"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateListForm;
