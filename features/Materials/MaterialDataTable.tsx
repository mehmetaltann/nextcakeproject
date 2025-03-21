import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import { IconButton } from "@mui/material";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { Material } from "@/lib/types/all";
import { updateMaterial } from "@/app/actions/updateData";
import { deleteMaterial } from "@/app/actions/deleteData";
import DataTableFrame from "@/components/Tables/DataTableFrame";
import {
  actionColumn,
  numberColumn,
  priceColumn,
  stringColumn,
} from "@/components/Tables/columns";

interface MaterialDataTableProps {
  allMaterials: Material[];
}

const useFakeMutation = () => {
  return useCallback(
    (item: any) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.name?.trim() === "") {
            reject(new Error("İsim Boş Olamaz"));
          } else {
            resolve({ ...item, name: item.name });
          }
        }, 200);
      }),
    []
  );
};

const MaterialDataTable = ({ allMaterials }: MaterialDataTableProps) => {
  const mutateRow = useFakeMutation();

  const processRowUpdate = useCallback(
    async (newRow: Material) => {
      try {
        const response = await mutateRow(newRow);
        const res = await updateMaterial(newRow);

        handleResponseMsg(res);
        return response;
      } catch (error) {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin: " + error);
        throw error;
      }
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = useCallback((error: string) => {
    toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
  }, []);

  const columns = [
    stringColumn("name", "İsim", 250, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    numberColumn("amount", "Miktar", 120),
    stringColumn("unit", "Birim", 120),
    priceColumn("price", "Fiyat", 150, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params: any) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    stringColumn("type", "Tür", 120),
    actionColumn({
      renderCell: (params: any, index: any) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteMaterial(params.row._id);
                handleResponseMsg(res);
              } catch (error) {
                toast.error("Bir hata oluştu. Lütfen tekrar deneyin." + error);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    }),
  ];

  return (
    <DataTableFrame
      columns={columns}
      rows={allMaterials}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      getRowId={(row: Material) => row._id}
      disableColumnFilter
      disableDensitySelector
      disableExport
    />
  );
};

export default MaterialDataTable;
