import CakeDataTableRow from "./CakeDataTableRow";
import { Fragment, useState } from "react";
import { CakeExtented } from "@/lib/types/all";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface CakeDataTableProps {
  allCakes: CakeExtented[];
}

const CakeDataTable = ({ allCakes }: CakeDataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">İsim</TableCell>
              <TableCell align="left">Boyut</TableCell>
              <TableCell align="left">Maliyet</TableCell>
              <TableCell align="left">Notlar</TableCell>
              <TableCell align="left">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? allCakes.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allCakes
            ).map((item, index) => (
              <CakeDataTableRow
                data={item}
                key={item._id}
                cakeIndex={page * rowsPerPage + index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allCakes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default CakeDataTable;
