import Header from "@/components/layouts/Header";
import ParameterMain from "@/features/Parameters/ParameterMain";
import { PageWrapper } from "@/components/layouts/Wrappers";
import { getParameters } from "../actions/getData";

export default async function Cakes() {
  const allParameters = await getParameters();

  return (
    <>
      <Header />
      <PageWrapper>
        <ParameterMain allParameters={allParameters} />
      </PageWrapper>
    </>
  );
}
