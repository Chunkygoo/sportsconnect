import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useTranslation from "next-translate/useTranslation";
import { Offline } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuperTokensWrapper } from "supertokens-auth-react";
import type { layoutType } from "../../types/layout";
import MyHead from "../Meta/MyHead";
import Modal from "../Modal/Modal";
import Footer from "../Nav/Footer";
import Header from "../Nav/Header";

export default function Layout({ children }: layoutType) {
  const { t } = useTranslation();
  const offlineTitle = t("offline:offline_title");
  const offlineDescription = t("offline:offline_description");
  return (
    <SuperTokensWrapper>
      <MyHead />
      <Header />
      {children}
      <Footer />
      <Offline>
        <Modal
          initialShow={true}
          title={offlineTitle}
          description={offlineDescription}
        />
      </Offline>
      <ToastContainer />
      <ReactQueryDevtools />
    </SuperTokensWrapper>
  );
}
