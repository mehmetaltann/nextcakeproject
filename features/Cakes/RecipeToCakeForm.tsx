import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { Autocomplete } from "formik-mui";
import { useCallback, useEffect, useState } from "react";
import { getMaterials, getRecipes } from "@/app/actions/getData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { addRecipeToCake } from "@/app/actions/addData";
import { Material, Recipe } from "@/lib/types/all";
import { Stack, Button, TextField } from "@mui/material";

interface RecipeToCakeFormProps {
  setOpenModel: (open: boolean) => void;
  cakeId: string;
}

const RecipeToCakeForm = ({ setOpenModel, cakeId }: RecipeToCakeFormProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await getRecipes();
      setRecipes(response);
    } catch (error) {
      console.error("Tarif verileri yüklenirken hata oluştu:", error);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const validateSchema = Yup.object().shape({
    title: Yup.object().nullable().required("Tarif seçmek zorunludur"),
    amount: Yup.number()
      .required("Miktar gerekli")
      .moreThan(0, "Sıfırdan büyük olmalıdır"),
  });

  async function submitHandler(
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) {
    try {
      const res = await addRecipeToCake(
        cakeId,
        values.title?._id,
        values.amount
      );
      handleResponseMsg(res);
      setOpenModel(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
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
              options={recipes}
              getOptionLabel={(option: Material) => option.name || ""}
              isOptionEqualToValue={(option: any, value: any) =>
                option._id === value?._id
              }
              onChange={(_: any, selectedOption: any) => {
                setFieldValue("title", selectedOption || null);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  name="title"
                  error={touched.title && !!errors.title}
                  helperText={errors.title}
                  label="Tarif Seç"
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

export default RecipeToCakeForm;
