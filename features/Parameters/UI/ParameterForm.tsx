import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../../components/forms/FormTextField";
import { Form, Formik, FormikHelpers } from "formik";
import { addContentToParameter } from "@/app/actions/addData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { Button, Stack } from "@mui/material";
import { toast } from "react-toastify";

interface ParameterFormProps {
  parameterId: string;
}

const ParameterForm = ({ parameterId }: ParameterFormProps) => {
  async function submitHandler(
    values: { title: string; val: string },
    { resetForm }: FormikHelpers<{ title: string; val: string }>
  ) {
    try {
      const res = await addContentToParameter(
        parameterId,
        values.title,
        values.val
      );
      resetForm();
      handleResponseMsg(res);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Bilinmeyen hata";
      toast.error(`Bir hata oluştu. Lütfen tekrar deneyin. Hata: ${errorMsg}`);
    }
  }

  return (
    <Formik initialValues={{ title: "", val: "" }} onSubmit={submitHandler}>
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={3} sx={{ p: 2, maxWidth: 250 }}>
            <FormTextField name="title" label="İsim" size="small" />
            <FormTextField name="val" label="Değer" size="small" />
            <Button
              type="submit"
              sx={{ borderRadius: "5%", minWidth: 120 }}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              disabled={isSubmitting} // Gönderim sırasında buton devre dışı kalır
            >
              {isSubmitting ? "Ekleniyor..." : "Ekle"}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ParameterForm;
