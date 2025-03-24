import Header from "@/components/layouts/Header";
import CakeMain from "@/features/Cakes/CakeMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getCakes } from "../actions/getData";

export default async function Cakes() {
  const allCakes = await getCakes();

  return (
    <>
      <Header />
      <PageWrapper>
        <CakeMain allCakes={allCakes} />
      </PageWrapper>
    </>
  );
}
