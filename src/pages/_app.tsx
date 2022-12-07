import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps, AppType } from "next/app";
import { Fragment } from "react";
import { Offline } from "react-detect-offline";
import { toast, ToastContainer } from "react-toastify";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";
import { trpc } from "../utils/trpc";

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import MyHead from "../components/Meta/MyHead";
import Modal from "../components/Modal/Modal";
import Layout from "../components/Shared/Layout";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig);
}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const offlineTitle = t("offline:offline_title");
  const offlineDescription = t("offline:offline_description");

  const logOutHelper = async () => {
    await signOut();
    toast.success(t("header:logged_out") as string, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    router.push("/home");
  };

  return (
    <Fragment>
      <MyHead />
      <SuperTokensWrapper>
        <Layout logOutHelper={logOutHelper}>
          <Component {...pageProps} />
        </Layout>
      </SuperTokensWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
      <Offline>
        <Modal
          initialShow={true}
          title={offlineTitle}
          description={offlineDescription}
        />
      </Offline>
      <ToastContainer />
    </Fragment>
  );
};

export default trpc.withTRPC(MyApp);
