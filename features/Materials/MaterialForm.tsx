import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import FormSelect from "../../components/forms/FormSelect";
import FormTextField from "../../components/forms/FormTextField";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { Stack, MenuItem, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getParameters } from "@/app/actions/getData";
import { MaterialWithoutId, Parameter } from "@/lib/types/all";
import { toast } from "react-toastify";
import { addMaterial } from "@/app/actions/addData";
import { handleResponseMsg } from "@/utils/toast-helper";

interface MaterialFormProps {
  setOpenModel: (open: boolean) => void;
}

const initialVal: MaterialWithoutId = {
  name: "",
  type: "Gıda",
  unit: "Gram",
  amount: 0,
  price: 0,
  description: "",
};

const MaterialForm: React.FC<MaterialFormProps> = ({ setOpenModel }) => {
  const [parameters, setParameters] = useState<Parameter[]>([]);

  const submitHandler = async (
    values: MaterialWithoutId,
    { setSubmitting }: FormikHelpers<MaterialWithoutId>
  ) => {
    const newRecord = {
      name: values.name,
      type: values.type,
      unit: values.unit,
      amount: values.amount,
      price: values.price,
      description: values.description,
    };
    try {
      const res = await addMaterial(newRecord);
      handleResponseMsg(res);
      setOpenModel(false);
      setSubmitting(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  };

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
    type: Yup.string().required("Boş Olamaz"),
    unit: Yup.string().required("Boş Olamaz"),
    amount: Yup.number()
      .required("Gerekli")
      .positive("Sıfırdan Büyük Olmalıdır")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
    price: Yup.number()
      .required("Gerekli")
      .positive("Sıfırdan Büyük Olmalıdır")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  return (
    <>
      <Formik
        initialValues={initialVal}
        onSubmit={submitHandler}
        validationSchema={validateSchema}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Stack spacing={2} sx={{ pl: 1 }}>
              <FormTextField
                sx={{ width: "100%" }}
                name="name"
                label="İsim"
                size="small"
              />
              <Field
                name="type"
                component={FormSelect}
                label="Tür"
                form={{ setFieldValue }}
                field={{ name: "type", value: values.type }}
              >
                {parameters
                  .filter((item) => item.variant === "Malzeme Türü")
                  .map((item, index) =>
                    item.content?.map(({ title }, idx) => (
                      <MenuItem value={title} key={`${index}-${idx}`}>
                        {title}
                      </MenuItem>
                    ))
                  )}
              </Field>
              <FormTextField
                sx={{ width: "100%" }}
                name="amount"
                label="Miktar"
                type="number"
                size="small"
              />
              <Field name="unit" component={FormSelect} label="Birim">
                {parameters
                  .filter((item) => item.variant === "Malzeme Birim")
                  .map((item, index) =>
                    item.content?.map(({ title }, idx) => (
                      <MenuItem value={title} key={`${index}-${idx}`}>
                        {title}
                      </MenuItem>
                    ))
                  )}
              </Field>
              <FormTextField
                sx={{ width: "100%" }}
                name="price"
                label="Fiyat"
                type="number"
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
    </>
  );
};

export default MaterialForm;
