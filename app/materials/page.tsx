import Header from "@/components/layouts/Header";
import MtMain from "@/features/Materials/MtMain";
import { PageWrapper } from "@/components/layouts/Wrappers";

export default function Materials() {
  return (
    <>
      <Header />
      <PageWrapper maxW="lg">
        <MtMain />
      </PageWrapper>
    </>
  );
}
