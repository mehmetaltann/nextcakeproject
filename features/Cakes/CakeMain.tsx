"use client";
import CakeForm from "./CakeForm";
import CakeDataTable from "./CakeDataTable";
import PageFormContainer from "@/components/PageFormContainer";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CakeExtented } from "@/lib/types/all";
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
        <CakeDataTable allCakes={allCakes} />
      ) : (
        <Loader />
      )}
    </Stack>
  );
};

export default CakeMain;
