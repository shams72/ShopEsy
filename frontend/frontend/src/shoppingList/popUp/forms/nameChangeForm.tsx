import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLists } from "../../../context/ListProvider";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import { Button, Typography } from "@mui/material";

import DOMPurify from "dompurify";

interface NameChangeFormProps {
  setError: React.Dispatch<React.SetStateAction<boolean | null>>;
}

//componennt to change the nae ofa lsit
const NameChangeForm: React.FC<NameChangeFormProps> = ({ setError }) => {
  const { listName, editNameOfLists, setListName } = useLists();

  const initialValues = {
    newName: "",
  };

  const validationSchema = Yup.object({
    newName: Yup.string().required("Name is required"),
  });

  //function to change the name
  const handleSubmit =
    (listName: string) =>
    async (
      values: typeof initialValues,
      { resetForm }: FormikHelpers<typeof initialValues>
    ) => {
      try {
        const response = await fetch("/editNameOfShoppingLists", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: listName,
            newName: DOMPurify.sanitize(values.newName),
          }),
        });

        if (!response.ok) {
          setError(true);
          resetForm();
        } else {
          setError(false);
          const result = await response.json();
          console.log(result.data.newame);
          console.log(listName);
          editNameOfLists(listName, result.data);
          setListName(result.data);
          console.log(result);
          resetForm();
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      }
    };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit(listName)}
      >
        {({ isSubmitting }) => (
          <Form className="arrangeFormsStructure">
            <Typography variant="body1">Name: {listName}</Typography>
            <div className="resizeInnerForm">
              <Field type="text" name="newName" placeholder="Change Name" />
              <ErrorMessage name="newName" component="div" className="error" />
              <Button
                sx={{
                  height: 30,
                  backgroundColor: "yellow",
                  color: "black",
                  borderRadius: "12px",
                  border: "2px solid black",
                }}
                type="submit"
                className="changeSubmitColor"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NameChangeForm;
