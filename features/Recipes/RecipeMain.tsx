"use client";
import PageFormContainer from "@/components/PageFormContainer";
import RecipeForm from "./RecipeForm";
import RecipeDataTable from "./RecipeDataTable";
import { RecipeExtented } from "@/lib/types/all";
import { Stack } from "@mui/material";
import { useState } from "react";

import { Loader } from "@/components/layouts/Loader";

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
      {allRecipes && allRecipes.length > 0 ? (
        <RecipeDataTable allRecipes={allRecipes} />
      ) : (
        <Loader />
      )}
    </Stack>
  );
};

export default RecipeMain;
