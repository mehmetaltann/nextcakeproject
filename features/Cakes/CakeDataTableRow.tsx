import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalButton from "@/components/modals/ModalButton";
import MaterialToCakeForm from "./MaterialToCakeForm";
import RecipeToCakeForm from "./RecipeToCakeForm";
import { Fragment, useCallback, useState } from "react";
import { CakeExtented } from "@/lib/types/all";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import {
  deleteCake,
  deleteMaterialFromCake,
  deleteRecipeFromCake,
} from "@/app/actions/deleteData";
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

interface CakeDataTableRowProps {
  data: CakeExtented;
  cakeIndex: number;
}

const CakeDataTableRow = ({ data, cakeIndex }: CakeDataTableRowProps) => {
  const {
    _id: cakeId,
    size,
    name,
    description,
    materials,
    recipes,
    totalCost,
  } = data;
  const [openAddMtToCakeModel, setOpenAddMtToCakeModel] = useState(false);
  const [openAddRecToCakeModel, setOpenAddRecToCakeModel] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  const handleDeleteCake = useCallback(async () => {
    try {
      const res = await deleteCake(cakeId);
      handleResponseMsg(res);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
    }
  }, [cakeId]);

  const handleDeleteMaterialFromCake = useCallback(
    async (materialId: string) => {
      try {
        const res = await deleteMaterialFromCake(cakeId, materialId);
        handleResponseMsg(res);
      } catch (error) {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
      }
    },
    [cakeId]
  );

  const handleDeleteRecipeFromCake = useCallback(
    async (recipeId: string) => {
      try {
        const res = await deleteRecipeFromCake(cakeId, recipeId);
        handleResponseMsg(res);
      } catch (error) {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
      }
    },
    [cakeId]
  );

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="2%">
          <IconButton
            aria-label="expand row"
            color="secondary"
            size="small"
            onClick={handleToggle}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {cakeIndex + 1}
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{size}</TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
          width="15%"
        >
          {`${totalCost.toFixed(2)} TL`}
        </TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          <IconButton size="small" color="secondary" onClick={handleDeleteCake}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="2%">
                      No
                    </TableCell>
                    <TableCell align="left" width="20%">
                      İsim
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Miktar
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Birim
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Maliyet
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Tarif Sil
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(recipes) &&
                    recipes?.map(
                      (
                        { _id: recipeId, name, materialcost, quantity },
                        index
                      ) => (
                        <TableRow
                          key={index}
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
                          <TableCell>{quantity}</TableCell>
                          <TableCell>Ölçü</TableCell>
                          <TableCell
                            sx={{ color: "secondary.main", fontWeight: 500 }}
                          >{`${materialcost.toFixed(2)} TL`}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() =>
                                handleDeleteRecipeFromCake(recipeId)
                              }
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
                        buttonTitle="Yeni Tarif Ekle"
                        minW="20vh"
                        title="Yeni Pasta Tarifi"
                        modalOpen={openAddRecToCakeModel}
                        setModalOpen={setOpenAddRecToCakeModel}
                      >
                        <RecipeToCakeForm
                          setOpenModel={setOpenAddRecToCakeModel}
                          cakeId={cakeId}
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
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
                    ({ id: materialId, name, unit, quantity, cost }, index) => (
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
                        <TableCell>{quantity}</TableCell>
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
                            onClick={() =>
                              handleDeleteMaterialFromCake(materialId)
                            }
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
                        title="Yeni Pasta Malzemesi"
                        modalOpen={openAddMtToCakeModel}
                        setModalOpen={setOpenAddMtToCakeModel}
                      >
                        <MaterialToCakeForm
                          setOpenModel={setOpenAddMtToCakeModel}
                          cakeId={cakeId}
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

export default CakeDataTableRow;
