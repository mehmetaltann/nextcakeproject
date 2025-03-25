import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Parameter } from "@/lib/types/all";
import { addParameter } from "@/app/actions/addData";
import { deleteParameter } from "@/app/actions/deleteData";
import { handleResponseMsg } from "@/utils/toast-helper";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Stack,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

interface NewParameterProps {
  allParameters: Parameter[];
}

const NewParameter = ({ allParameters }: NewParameterProps) => {
  const [variant, setVariant] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newRecord = { variant, content: [] };
    try {
      const res = await addParameter(newRecord);
      handleResponseMsg(res);
      setVariant("");
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const deleteHandler = useCallback(async (parameterId: string) => {
    try {
      const res = await deleteParameter(parameterId);
      handleResponseMsg(res);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Bilinmeyen hata";
      toast.error(`Bir hata oluştu. Lütfen tekrar deneyin. Hata: ${errorMsg}`);
    }
  }, []);

  return (
    <Grid container sx={{ width: "100%", mt: 2 }} spacing={2}>
      <Grid>
        <Stack spacing={2}>
          <Typography>Yeni Parametre</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ minWidth: 120, maxWidth: 200 }}
              size="small"
              label="İsim"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            />
            <Button
              type="submit"
              sx={{ borderRadius: "5%", minWidth: 120, maxWidth: 200 }}
              variant="contained"
              color={"success"}
              endIcon={<SendIcon />}
            >
              Ekle
            </Button>
          </form>
        </Stack>
      </Grid>
      <Grid>
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{ p: 1, mb: 1 }}
        >
          Parametre Listesi
        </Typography>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">İsim</TableCell>
                <TableCell align="center">Sil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allParameters.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.variant}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteHandler(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default NewParameter;
