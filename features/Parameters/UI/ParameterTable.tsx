import DeleteIcon from "@mui/icons-material/Delete";
import { deleteContentFromParameter } from "@/app/actions/deleteData";
import { handleResponseMsg } from "@/utils/toast-helper";
import { ParameterContent } from "@/lib/types/all";
import { toast } from "react-toastify";
import { useCallback } from "react";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";

interface ParameterTableProps {
  parameterId: string;
  data: ParameterContent[];
  tableWidth: number;
}

const ParameterTable = ({
  tableWidth,
  data,
  parameterId,
}: ParameterTableProps) => {
  const deleteHandler = useCallback(
    async (contentId: string) => {
      try {
        const res = await deleteContentFromParameter(parameterId, contentId);
        handleResponseMsg(res);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Bilinmeyen hata";
        toast.error(
          `Bir hata oluştu. Lütfen tekrar deneyin. Hata: ${errorMsg}`
        );
      }
    },
    [parameterId]
  );

  return (
    <TableContainer component={Paper} sx={{ width: tableWidth || "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>İsim</TableCell>
            <TableCell align="left">Değer</TableCell>
            <TableCell align="center">İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: ParameterContent, index: number) => (
            <TableRow
              key={row._id || index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
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
  );
};

export default ParameterTable;
