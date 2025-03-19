import { TextField, TextFieldProps } from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import React from "react";

// Prop'lar için TypeScript interface'i
interface FormSelectProps
  extends Omit<TextFieldProps, "name" | "value" | "onChange"> {
  form: FormikProps<FormikValues>;
  field: {
    name: string;
    value: any;
  };
  children: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({
  children,
  form,
  field,
  ...rest
}) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      type="text"
      sx={{ width: "100%" }}
      name={name}
      value={value ?? ""}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      size="small"
      {...rest}
    >
      {children}
    </TextField>
  );
};

export default FormSelect;
