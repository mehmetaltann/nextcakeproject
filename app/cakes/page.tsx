import Header from "@/components/layouts/Header";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getCakes } from "../actions/getData";

export default async function Cakes() {
  const allCakes = await getCakes();
  console.log(allCakes);

  return (
    <>
      <Header />
      <PageWrapper>deeme</PageWrapper>
    </>
  );
}
