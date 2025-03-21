import Header from "@/components/layouts/Header";
import MaterialMain from "@/features/Materials/MaterialMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getMaterials } from "../actions/getData";
import { Material } from "@/lib/types/all";
import { Loader } from "@/components/layouts/Loader";

export default async function Materials() {
  const allMaterials = (await getMaterials()) as Material[];

  return (
    <>
      <Header />
      <PageWrapper>
        {allMaterials && allMaterials.length > 0 ? (
          <MaterialMain allMaterials={allMaterials} />
        ) : (
          <Loader />
        )}
      </PageWrapper>
    </>
  );
}
