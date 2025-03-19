import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

// Prop'lar için TypeScript interface'i
interface FormDatePickerProps extends Omit<TextFieldProps, "name"> {
  name: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  ...otherProps
}) => {
  // Formik'in useField hook'unu kullanarak field bilgilerini alıyoruz
  const [field] = useField(name);

  // TextField'in prop'larını birleştiriyoruz
  const configTextField: TextFieldProps = {
    type: "date",
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherProps,
  };

  return <TextField {...configTextField} />;
};

export default FormDatePicker;
