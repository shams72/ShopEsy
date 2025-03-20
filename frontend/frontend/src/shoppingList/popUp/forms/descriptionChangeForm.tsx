import React from "react";
import { useLists } from "../../../context/ListProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikHelpers } from 'formik'; // Import FormikHelpers
import { Button, Typography } from "@mui/material";
interface DescriptionChangeFormProp {
  description: string | undefined;
}

//compoonent to change the description
const DescriptionChangeForm: React.FC<DescriptionChangeFormProp> = ({
  description,
}) => {
  const { listName, editDescriptionOfLists } = useLists();

  const initialValues = {
    desc: "",
  };

  //function to change descirption of list
  const handleDescriptionChange =
    (listName: string) => async (values: typeof initialValues,{ resetForm }: FormikHelpers<typeof initialValues>) => {
      const description = String(values.desc);

      try {
        const response = await fetch("/editDescriptionOfShoppingLists", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: listName,
            description: description,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(listName);
        console.log(result.data);
        editDescriptionOfLists(listName, result.data);
        console.log(result);
        resetForm()
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleDescriptionChange(listName)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="arrangeFormsStructure">
              <Typography variant="body1">List Description: {description}</Typography>
                <div className="resizeInnerForm">
                  
                  <Field
                    as="textarea"
                    name="desc" 
                    placeholder="Change Description"
                    className="textAreaStyle"
                  />
                
                  <Button  sx={{ height:30,backgroundColor: 'yellow', color:"black",borderRadius: "12px",border: '2px solid black',}}
                    type="submit"
                    className="changeSubmitColor"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Submit"}
                  </Button>
                </div>
              </div>
             
              <ErrorMessage
                name="description"
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

export default DescriptionChangeForm;
