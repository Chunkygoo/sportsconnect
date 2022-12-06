import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps, AppType } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";
import { trpc } from "../utils/trpc";

import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Common/Spinner";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig);
}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  // const router = useRouter();

  // for SuperTokens getServerSideProps
  // useEffect(() => {
  //   const refresh = async () => {
  //     if (pageProps.fromSupertokens === "needs-refresh") {
  //       console.log("calling needs-refresh");
  //       if (await SessionReact.attemptRefreshingSession()) {
  //         console.log("succeeded calling needs-refresh");
  //         router.replace(router.asPath);
  //       } else {
  //         console.log("failed calling needs-refresh");
  //         router.push("/auth/loginsignup");
  //       }
  //     }
  //   };
  //   refresh();
  // }, [pageProps.fromSupertokens, router]);
  // End for SuperTokens getServerSideProps

  if (pageProps.fromSupertokens === "needs-refresh") {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <Spinner size="12" />
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {/* <MyHead /> */}
      <SuperTokensWrapper>
        {/* <Layout logOutHelper={logOutHelper}> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </SuperTokensWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <Offline>
        <Modal
          initialShow={true}
          title={offlineTitle}
          description={offlineDescription}
        />
      </Offline> */}
      <ToastContainer />
    </Fragment>
  );
};

export default trpc.withTRPC(MyApp);
