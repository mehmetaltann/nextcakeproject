"use client";
import PageFormContainer from "@/components/PageFormContainer";
import RecipeForm from "./RecipeForm";
import RecipeDataTable from "./RecipeDataTable";
import { RecipeExtented } from "@/lib/types/all";
import { Paper, Stack } from "@mui/material";
import { useState } from "react";
import { DataTableWrapper } from "@/components/layouts/Wrappers";

interface RecipeMainProps {
  allRecipes: RecipeExtented[];
}

const RecipeMain = ({ allRecipes }: RecipeMainProps) => {
  const [openRecipeAddModal, setOpenRecipeAddModal] = useState(false);

  return (
    <Stack spacing={2}>
      <PageFormContainer
        modalOpen={openRecipeAddModal}
        setModalOpen={setOpenRecipeAddModal}
        title="Yeni Tarif"
        modalHeight="30vh"
      >
        <RecipeForm setOpenModel={setOpenRecipeAddModal} />
      </PageFormContainer>
      <Paper>
        <DataTableWrapper tableHeight={"78vh"} sx={{ p: { xs: 1, md: 2 } }}>
          <RecipeDataTable allRecipes={allRecipes} />
        </DataTableWrapper>
      </Paper>
    </Stack>
  );
};

export default RecipeMain;
