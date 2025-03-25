"use client";
import PageFormContainer from "@/components/PageFormContainer";
import MaterialForm from "./MaterialForm";
import MaterialDataTable from "./MaterialDataTable";
import { useState } from "react";
import { Material } from "@/lib/types/all";
import { Stack } from "@mui/material";

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

      <MaterialDataTable allMaterials={allMaterials} />
    </Stack>
  );
};

export default MaterialMain;
