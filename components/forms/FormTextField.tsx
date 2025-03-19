import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

// Prop'lar için TypeScript interface'i
interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  ...otherProps
}) => {
  // Formik'in useField hook'unu kullanarak field ve meta bilgilerini alıyoruz
  const [field, meta] = useField(name);

  // TextField'in prop'larını birleştiriyoruz
  const configTextField: TextFieldProps = {
    ...field,
    ...otherProps,
  };

  // Hata durumunda error ve helperText prop'larını ayarlıyoruz
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default FormTextField;
