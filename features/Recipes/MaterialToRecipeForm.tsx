import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { Autocomplete } from "formik-mui";
import { JSX, useCallback, useEffect, useState } from "react";
import { getMaterials } from "@/app/actions/getData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { addMaterialToRecipe } from "@/app/actions/addData";
import { Material } from "@/lib/types/all";
import {
  Stack,
  Button,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material";

interface MaterialToRecipeFormProps {
  setOpenModel: (open: boolean) => void;
  recipeId: string;
}

const MaterialToRecipeForm = ({
  setOpenModel,
  recipeId,
}: MaterialToRecipeFormProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);

  const fetchMaterials = useCallback(async () => {
    try {
      const response = await getMaterials();
      setMaterials(response);
    } catch (error) {
      console.error("Parametre verileri yüklenirken hata oluştu:", error);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const validateSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  async function submitHandler(
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) {
    try {
      const res = await addMaterialToRecipe(
        recipeId,
        values.title.id,
        values.amount
      );
      handleResponseMsg(res);
      setOpenModel(false);
      setSubmitting(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{
        title: null,
        amount: 0,
      }}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ setFieldValue, touched, errors, isSubmitting }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <Field
              name="title"
              component={Autocomplete}
              options={materials}
              getOptionLabel={(option: { name: any }) => option.name || ""}
              isOptionEqualToValue={(option: { id: any }, value: { id: any }) =>
                option.id === value.id
              }
              renderInput={(
                params: JSX.IntrinsicAttributes & {
                  variant?: TextFieldVariants | undefined;
                } & Omit<
                    | FilledTextFieldProps
                    | OutlinedTextFieldProps
                    | StandardTextFieldProps,
                    "variant"
                  >
              ) => (
                <TextField
                  {...params}
                  name="title"
                  error={touched.title && !!errors.title}
                  helperText={errors.title}
                  label="Malzeme Seç"
                  variant="outlined"
                />
              )}
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="amount"
              label="Miktar"
              type="number"
              size="small"
            />
            <Button
              type="submit"
              sx={{ width: "100%" }}
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              disabled={isSubmitting}
            >
              Ekle
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default MaterialToRecipeForm;
