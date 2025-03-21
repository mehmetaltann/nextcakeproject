import { Fragment, useState } from "react";
import { RecipeExtented } from "@/lib/types/all";
import RecipeDataTableRow from "./RecipeDataTableRow";
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

interface RecipeDataTableProps {
  allRecipes: RecipeExtented[];
}

const RecipeDataTable = ({ allRecipes }: RecipeDataTableProps) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  // Handle page change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate empty rows for pagination
  const emptyRows =
    page >= Math.ceil(allRecipes.length / rowsPerPage) - 1
      ? rowsPerPage - (allRecipes.length % rowsPerPage)
      : 0;

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">İsim</TableCell>
              <TableCell align="left">Maliyet</TableCell>
              <TableCell align="left">Notlar</TableCell>
              <TableCell align="left">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? allRecipes.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allRecipes
            ).map((item, index) => (
              <RecipeDataTableRow
                data={item}
                key={item._id}
                recipeIndex={page * rowsPerPage + index}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[12, 25, 50, { label: "All", value: -1 }]}
        component="div"
        count={allRecipes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default RecipeDataTable;
