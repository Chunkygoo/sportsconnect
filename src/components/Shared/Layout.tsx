import type { layoutType } from "../../types/layout";
import Footer from "../Nav/Footer";
import Header from "../Nav/Header";

export default function Layout({ children, logOutHelper }: layoutType) {
  return (
    <>
      <Header logOutHelper={logOutHelper} />
      {children}
      <Footer />
    </>
  );
}
