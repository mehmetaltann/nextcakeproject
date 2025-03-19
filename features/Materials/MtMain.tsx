"use client";
import { DataTableWrapper } from "@/components/layouts/Wrappers";
import PageFormContainer from "@/components/PageFormContainer";
import { Paper, Stack } from "@mui/material";
import { useState } from "react";

const MtMain = () => {
  const [openMaterialAddModal, setOpenMaterialAddModal] = useState(false);

  return (
    <Stack spacing={2}>
      <PageFormContainer
        modalOpen={openMaterialAddModal}
        setModalOpen={setOpenMaterialAddModal}
        title="Yeni Malzeme"
        modalHeight="60vh"
      >
        <MaterialForm
          setOpenModel={setOpenMaterialAddModal}
          initialValues={{
            name: "",
            type: "Gıda",
            unit: "Gram",
            amount: 0,
            price: 0,
            description: "",
            brand: "",
            date: materialDateInput,
          }}
          submitFunction={addMaterial}
        />
      </PageFormContainer>
      <Paper>
        <DataTableWrapper
          tableHeight={"78vh"}
          sxProps={{ p: { xs: 1, md: 2 } }}
        >
          <MDataTable />
        </DataTableWrapper>
      </Paper>
    </Stack>
  );
};

export default MtMain;
