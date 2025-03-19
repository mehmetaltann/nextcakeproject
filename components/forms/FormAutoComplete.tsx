import { Fragment } from "react";
import { getIn } from "formik";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  AutocompleteProps,
  TextFieldProps,
} from "@mui/material";
import { FieldProps, FormikProps } from "formik";

// Seçeneklerin tipi
interface OptionType {
  value: number | string;
  label: string;
}

// Prop'lar için TypeScript interface'i
interface FormAutoCompleteProps
  extends Omit<
    AutocompleteProps<OptionType, false, false, false>,
    "renderInput" | "onChange" | "value"
  > {
  textFieldProps?: TextFieldProps;
  field: FieldProps["field"];
  form: FormikProps<any>;
  label: string;
  options: OptionType[];
  isLoading?: boolean;
  setFieldValue?: (value: OptionType | null) => void;
}

const FormAutoComplete: React.FC<FormAutoCompleteProps> = ({
  textFieldProps,
  field,
  form,
  label,
  options,
  isLoading,
  setFieldValue,
  ...props
}) => {
  // Hata metnini al
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  // Başlangıç değeri
  const valueInit: OptionType[] = [
    {
      value: 0,
      label: "",
    },
  ];

  return (
    <Autocomplete
      {...props}
      {...field}
      options={[...valueInit, ...options]}
      getOptionLabel={(option) => (option ? option.label : "")}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      loading={isLoading}
      value={field.value || null}
      onChange={(e, value) => {
        form.setFieldValue(field.name, value);
        if (setFieldValue) {
          setFieldValue(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          label={label}
          helperText={errorText?.value || errorText}
          error={!!errorText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {isLoading ? (
                  <CircularProgress color="primary" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      multiple={false} // multiple prop'unu false olarak sabitledik
    />
  );
};

export default FormAutoComplete;
