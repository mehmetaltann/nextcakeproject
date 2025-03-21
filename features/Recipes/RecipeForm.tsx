import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import { Stack, Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { RecipeWithoutId } from "@/lib/types/all";
import { addRecipe } from "@/app/actions/addData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";

interface RecipeFormProps {
  setOpenModel: (open: boolean) => void;
}

const initialVal: RecipeWithoutId = {
  name: "",
  description: "",
  materials: [],
};

const RecipeForm = ({ setOpenModel }: RecipeFormProps) => {
  async function submitHandler(
    values: RecipeWithoutId,
    { setSubmitting }: FormikHelpers<RecipeWithoutId>
  ) {
    const newRecord = {
      name: values.name,
      description: values.description,
      materials: [],
    };
    try {
      const res = await addRecipe(newRecord);
      handleResponseMsg(res);
      setOpenModel(false);
      setSubmitting(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  }

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
  });

  return (
    <Formik
      initialValues={initialVal}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <FormTextField
              sx={{ width: "100%" }}
              name="name"
              label="İsim"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="description"
              label="Not"
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

export default RecipeForm;
