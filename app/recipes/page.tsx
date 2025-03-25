import Header from "@/components/layouts/Header";
import RecipeMain from "@/features/Recipes/RecipeMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getRecipes } from "../actions/getData";
import { RecipeExtented } from "@/lib/types/all";
import { Loader } from "@/components/layouts/Loader";

export default async function Recipes() {
  const allRecipes = (await getRecipes()) as RecipeExtented[];

  return (
    <>
      <Header />
      <PageWrapper>
        {allRecipes && allRecipes.length > 0 ? (
          <RecipeMain allRecipes={allRecipes} />
        ) : (
          <Loader />
        )}
      </PageWrapper>
    </>
  );
}
