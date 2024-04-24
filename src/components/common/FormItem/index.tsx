import type { FormControlProps } from "@mui/material";
import {
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material";
import type { FieldMetaProps, FieldProps } from "formik";
import { Field, useFormikContext } from "formik";
import React, { cloneElement } from "react";

export type IFormItemType = "upload" | "text" | "custom";

export type IFormItemProps = {
  label?: React.ReactNode;
  name?: string;
  children: React.ReactNode;
  tips?: React.ReactNode;
  fieldType?: IFormItemType;
  sign?: boolean;
  rightDiv?: React.ReactNode;
} & FormControlProps;

const CloneChildren = (children: any, { field }: FieldProps) => {
  const props = children.props;
  if (!!props.name || props.type === "hidden") {
    return children;
  }

  return cloneElement(children, { ...props, ...field });
};

export type IFormFieldProps = { name?: string; component: React.ReactNode };
const FormField: React.FC<IFormFieldProps> = ({ name, component }) => {
  if (!name) {
    return <>{component}</>;
  }

  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        return CloneChildren(component, fieldProps);
      }}
    </Field>
  );
};

const FormItem: React.FC<IFormItemProps> = ({
  label,
  name = "",
  tips,
  sign,
  children,
  fieldType = "text",
  rightDiv,
  sx,
  ...rest
}) => {
  const formik = useFormikContext<any>();

  // No <Formik /> on the upper level
  const { submitCount, getFieldMeta } = formik || {
    submitCount: 0,
    getFieldMeta: (v: string) => v,
  };

  const meta = (
    name ? getFieldMeta(name) : { error: "", touched: false }
  ) as FieldMetaProps<any>;
  const error = meta.error
    ? typeof meta.error === "string"
      ? meta.error
      : Object.values(meta.error as unknown as object)[0]
    : "";
  const showError = (meta.touched || submitCount > 0) && !!error;
  const showTips = showError || !!tips;

  return (
    <Stack
      error={showError}
      component={FormControl}
      {...rest}
      spacing={4}
      sx={{ ...sx }}
    >
      {label && (
        <FormLabel sx={{ mb: 4 }}>
          <Stack direction="row" spacing={10} alignItems="center">
            <Typography>
              {label}
              {sign && (
                <span style={{ marginLeft: 4, color: "var(--so-yellow)" }}>
                  *
                </span>
              )}
            </Typography>
            {rightDiv}
          </Stack>
        </FormLabel>
      )}
      {fieldType === "upload" || fieldType === "custom" || !formik ? (
        children
      ) : (
        <FormField name={name} component={children} />
      )}
      {showTips && <FormHelperText>{showError ? error : tips}</FormHelperText>}
    </Stack>
  );
};

export default FormItem;
