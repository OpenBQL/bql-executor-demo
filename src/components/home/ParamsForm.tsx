import React, { useMemo, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormItem from "@/components/common/FormItem";

const ParamsForm = ({ items, setFormValues }) => {
  const [errorMessage, setErrorMessage] = useState("");

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
      if (obj.required && !values[obj.name]) {
        errors[obj.name] = `${obj.name} is required!`;
      }
    }
    return errors;
  };

  const handleSubmit = (values) => {
    try {
      for (const item of items) {
        if (item.type === "object" || item.type === "array") {
          values[item.name] = JSON.parse(values[item.name]);
        }
      }
      setFormValues(values);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
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
                  sign={item.required ? true : false}
                >
                  <TextField placeholder={item.type} />
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
      <Typography sx={{ fontSize: 15, color: "common.brown", mt: 10 }}>
        {errorMessage}
      </Typography>
    </>
  );
};

export default ParamsForm;
