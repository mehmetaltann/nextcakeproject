import Header from "@/components/layouts/Header";
import RecipeMain from "@/features/Recipes/RecipeMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getRecipes } from "../actions/getData";
import { RecipeExtented } from "@/lib/types/all";

export default async function Recipes() {
  const allRecipes = (await getRecipes()) as RecipeExtented[];

  return (
    <>
      <Header />
      <PageWrapper>
        <RecipeMain allRecipes={allRecipes} />
      </PageWrapper>
    </>
  );
}
