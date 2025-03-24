import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalButton from "@/components/modals/ModalButton";
import MaterialToRecipeForm from "./MaterialToRecipeForm";
import { Fragment, useState } from "react";
import { RecipeExtented } from "@/lib/types/all";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import {
  Table,
  IconButton,
  TableBody,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Collapse,
} from "@mui/material";
import {
  deleteMaterialFromRecipe,
  deleteRecipe,
} from "@/app/actions/deleteData";

interface RecipeDataTableRowProps {
  data: RecipeExtented;
  recipeIndex: number;
}

const RecipeDataTableRow = ({ data, recipeIndex }: RecipeDataTableRowProps) => {
  const { _id: recipeId, name, description, materials, totalCost } = data;
  const [openAddMtToRecModel, setOpenAddMtToRecModel] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="2%">
          <IconButton
            color="secondary"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="3%">
          {recipeIndex + 1}
        </TableCell>
        <TableCell align="left" width="25%">
          {name}
        </TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
          width="15%"
        >
          {`${totalCost.toFixed(2)} TL`}
        </TableCell>
        <TableCell align="left" width="20%">
          {description}
        </TableCell>
        <TableCell align="left">
          <IconButton
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteRecipe(recipeId);
                handleResponseMsg(res);
              } catch (error) {
                toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{ margin: 1 }}
              className={open ? "collapse-content open" : "collapse-content"}
            >
              <Table size="small" aria-label="materials">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="1%">
                      No
                    </TableCell>
                    <TableCell align="left">İsim</TableCell>
                    <TableCell align="left">Miktar</TableCell>
                    <TableCell align="left">Birim</TableCell>
                    <TableCell align="left">Maliyet</TableCell>
                    <TableCell align="left">Malzeme Sil</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials?.map(
                    ({ id: materialId, name, unit, amount, cost }, index) => (
                      <TableRow
                        key={materialId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" width="1%">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {name}
                        </TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell>{unit}</TableCell>
                        <TableCell
                          align="left"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >
                          {`${cost.toFixed(2)} TL`}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={async () => {
                              try {
                                const res = await deleteMaterialFromRecipe(
                                  recipeId,
                                  materialId
                                );
                                handleResponseMsg(res);
                              } catch (error) {
                                toast.error(
                                  "Bir hata oluştu. Lütfen tekrar deneyin." +
                                    error
                                );
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  <TableRow>
                    <TableCell
                      align="right"
                      colSpan={6}
                      style={{ borderBottom: "none" }}
                    >
                      <ModalButton
                        color="secondary"
                        endIconLogo="addnew"
                        buttonTitle="Yeni Malzeme Ekle"
                        minW="20vh"
                        title="Yeni Tarif Malzemesi"
                        modalOpen={openAddMtToRecModel}
                        setModalOpen={setOpenAddMtToRecModel}
                      >
                        <MaterialToRecipeForm
                          setOpenModel={setOpenAddMtToRecModel}
                          recipeId={recipeId}
                        />
                      </ModalButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default RecipeDataTableRow;
