import type { AppProps } from "next/app";
import { Fragment } from "react";
import SuperTokensReact from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";

import appWithI18n from "next-translate/appWithI18n";
import i18nConfig from "../../i18n.mjs";
import MyHead from "../components/Meta/MyHead";
import Layout from "../components/Shared/Layout";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig);
}

const MyApp: any = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <MyHead />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
};

const i18nApp = appWithI18n(MyApp, {
  ...i18nConfig,
  skipInitialProps: true,
});
export default trpc.withTRPC(i18nApp);
