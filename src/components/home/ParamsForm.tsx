import React, { useMemo } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormItem from "@/components/common/FormItem";

const ParamsForm = ({ items, runExecutor }) => {
  const initialValues = useMemo(() => {
    const result = {};
    items.forEach((item) => {
      result[item.name] = "";
    });
    return result;
  }, [items]);

  const validate = (values) => {
    const errors: any = {};

    for (const obj of items) {
      if (!values[obj.name]) {
        errors[obj.name] = `${obj.name} is required!`;
      }
    }
    return errors;
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Typography sx={{ mb: 20, mt: 40 }}>Params</Typography>
      <Box sx={{ border: "1px solid var(--so-border)", p: 20 }}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {() => (
            <Stack component={Form} spacing={20} sx={{ width: "100%" }}>
              {items.map((item, index) => (
                <FormItem
                  key={index}
                  name={item.name}
                  label={item.description}
                  sign
                >
                  <TextField />
                </FormItem>
              ))}

              <Button
                type="submit"
                variant="contained"
                color="info"
                sx={{ height: 44 }}
              >
                Confirm
              </Button>
            </Stack>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ParamsForm;
