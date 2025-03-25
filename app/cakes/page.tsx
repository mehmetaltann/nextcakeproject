import Header from "@/components/layouts/Header";
import CakeMain from "@/features/Cakes/CakeMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getCakes } from "../actions/getData";
import { CakeExtented } from "@/lib/types/all";

export default async function Cakes() {
  const allCakes = (await getCakes()) as CakeExtented[];

  return (
    <>
      <Header />
      <PageWrapper>
        <CakeMain allCakes={allCakes} />
      </PageWrapper>
    </>
  );
}
