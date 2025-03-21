"use client";
import PageFormContainer from "@/components/PageFormContainer";
import MaterialForm from "./MaterialForm";
import MaterialDataTable from "./MaterialDataTable";
import { DataTableWrapper } from "@/components/layouts/Wrappers";
import { Paper, Stack } from "@mui/material";
import { useState } from "react";
import { Material } from "@/lib/types/all";

interface MaterialMainProps {
  allMaterials: Material[];
}

const MaterialMain = ({ allMaterials }: MaterialMainProps) => {
  const [openMaterialAddModal, setOpenMaterialAddModal] = useState(false);

  return (
    <Stack spacing={2}>
      <PageFormContainer
        modalOpen={openMaterialAddModal}
        setModalOpen={setOpenMaterialAddModal}
        title="Yeni Malzeme"
        modalHeight="60vh"
      >
        <MaterialForm setOpenModel={setOpenMaterialAddModal} />
      </PageFormContainer>
      <Paper>
        <DataTableWrapper tableHeight={"78vh"} sx={{ p: { xs: 1, md: 2 } }}>
          <MaterialDataTable allMaterials={allMaterials} />
        </DataTableWrapper>
      </Paper>
    </Stack>
  );
};

export default MaterialMain;
