"use client";
import CakeForm from "./CakeForm";
import CakeDataTable from "./CakeDataTable";
import PageFormContainer from "@/components/PageFormContainer";
import { Paper, Stack } from "@mui/material";
import { useState } from "react";
import { CakeExtented } from "@/lib/types/all";
import { DataTableWrapper } from "@/components/layouts/Wrappers";
import { Loader } from "@/components/layouts/Loader";

interface CakeMainProps {
  allCakes: CakeExtented[];
}

const CakeMain = ({ allCakes }: CakeMainProps) => {
  const [openCakeAddModal, setOpenCakeAddModal] = useState(false);
  return (
    <Stack spacing={2}>
      <PageFormContainer
        modalOpen={openCakeAddModal}
        setModalOpen={setOpenCakeAddModal}
        title="Yeni Ürün"
        modalHeight="30vh"
      >
        <CakeForm setOpenModel={setOpenCakeAddModal} />
      </PageFormContainer>
      {allCakes && allCakes.length > 0 ? (
        <Paper>
          <DataTableWrapper tableHeight={"78vh"} sx={{ p: { xs: 1, md: 2 } }}>
            <CakeDataTable allCakes={allCakes} />
          </DataTableWrapper>
        </Paper>
      ) : (
        <Loader />
      )}
    </Stack>
  );
};

export default CakeMain;
