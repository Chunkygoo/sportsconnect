import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppType } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { trpc } from "../utils/trpc";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Fragment>
      {/* <MyHead /> */}
      {/* <SuperTokensWrapper> */}
      {/* <Layout logOutHelper={logOutHelper}> */}
      <Component {...pageProps} />
      {/* </Layout> */}
      {/* </SuperTokensWrapper> */}
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
