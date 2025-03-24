import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import FormSelect from "../../components/forms/FormSelect";
import { Stack, Button, MenuItem } from "@mui/material";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { useCallback, useEffect, useState } from "react";
import { CakeWithoutId, Parameter } from "@/lib/types/all";
import { getParameters } from "@/app/actions/getData";
import { addCake } from "@/app/actions/addData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";

interface CakeFormProps {
  setOpenModel: (open: boolean) => void;
}

const initialVal: CakeWithoutId = {
  name: "",
  description: "",
  size: "",
  materials: [],
  recipes: [],
};

const CakeForm = ({ setOpenModel }: CakeFormProps) => {
  const [parameters, setParameters] = useState<Parameter[]>([]);

  const fetchParameters = useCallback(async () => {
    try {
      const response = await getParameters();
      setParameters(response);
    } catch (error) {
      console.error("Parametre verileri yüklenirken hata oluştu:", error);
    }
  }, []);

  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
    size: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
  });

  async function submitHandler(
    values: CakeWithoutId,
    { setSubmitting }: FormikHelpers<CakeWithoutId>
  ) {
    const newRecord = {
      name: values.name,
      description: values.description,
      size: values.size,
      materials: [],
      recipes: [],
    };
    try {
      const res = await addCake(newRecord);
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
            <Field name="size" component={FormSelect} label="Boyut">
              {parameters
                ?.find((item) => item.variant === "Pasta Boyutu")
                ?.content?.map(({ title }, index) => (
                  <MenuItem value={title} key={index}>
                    {title}
                  </MenuItem>
                ))}
            </Field>
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

export default CakeForm;
