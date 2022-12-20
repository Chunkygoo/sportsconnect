import type { AppProps } from "next/app";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import SuperTokensReact from "supertokens-auth-react";
import SessionReact from "supertokens-auth-react/recipe/session";
import { frontendConfig } from "../config/frontendConfig";

import appWithI18n from "next-translate/appWithI18n";
import { useRouter } from "next/router";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";
import i18nConfig from "../../i18n.mjs";
// import i18nConfig from "../../i18n.cjs";

import Layout from "../components/Shared/Layout";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyApp: any = ({ Component, pageProps }: AppProps) => {
  // function MyApp({ Component, pageProps }: AppProps): any {
  const router = useRouter();
  const [prefetchedPreLoggedIn, setPrefetchedPreLoggedIn] = useState(false);
  const [prefetchedPostLoggedIn, setPrefetchedPostLoggedIn] = useState(false);
  const utils = trpc.useContext();
  const { refetch: keepLambdaWarm } = trpc.health.getServerHealth.useQuery(
    undefined,
    {
      enabled: false,
    }
  );

  // Workaround for Lambda cold start (probably dont need this since we are executing getCurrentUser every 3 seconds)
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined); // we use a ref and not a variable because variables get reassigned (therefore creating another timer) upon rerender
  const startLambdaAndKeepWarm = useCallback(async () => {
    try {
      intervalRef.current = setInterval(keepLambdaWarm, 1000 * 60 * 5); // warm up every 5 mins
      await keepLambdaWarm(); // initial warm up, needs to come after setInterval so useEffect clean up runs in the right order when in "strict" mode
    } catch (error) {
      toast.error("An error occured while starting our servers", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [keepLambdaWarm]);

  const clear = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  useIdleTimer({
    timeout: 1000 * 60, // User is considered idle after 1 minute of inactivity
    onIdle: clear,
    onActive: startLambdaAndKeepWarm,
  });

  useEffect(() => {
    startLambdaAndKeepWarm();
    return clear;
  }, [startLambdaAndKeepWarm]);
  // End workaround for Lambda warm start

  useEffect(() => {
    switch (router.locale) {
      case "en-US":
        SuperTokensReact.changeLanguage("en");
        break;
      case "zh":
        SuperTokensReact.changeLanguage("zh");
        break;
      default:
        SuperTokensReact.changeLanguage("en");
    }
  }, [router.locale]);

  useEffect(() => {
    const prefetchQueries = async () => {
      if (prefetchedPreLoggedIn && prefetchedPostLoggedIn) return;
      const dummyInfiniteInput = {
        search: "",
        state: "all",
        conference: "all",
        division: "all",
        category: "all",
        region: "all",
        limit: 12,
      };
      try {
        if (
          !(await SessionReact.doesSessionExist()) &&
          !prefetchedPreLoggedIn
        ) {
          setPrefetchedPreLoggedIn(true);
          await utils.university.getPublicUniversities.prefetchInfinite(
            dummyInfiniteInput
          );
        } else if (
          (await SessionReact.doesSessionExist()) &&
          !prefetchedPostLoggedIn
        ) {
          await utils.userInfo.getCurrentUserInfo.prefetch();
          await utils.education.getEducations.prefetch();
          await utils.experience.getExperiences.prefetch();
          await utils.university.getMyUniversities.prefetchInfinite(
            dummyInfiniteInput
          );
          await utils.university.getMyInterestedUniversities.prefetchInfinite({
            ...dummyInfiniteInput,
          });
          setPrefetchedPostLoggedIn(true);
        }
      } catch (error) {
        console.log(error); // we admit that there is an error but it's ok
      }
    };
    prefetchQueries();
  }); // run this effect everytime _app renders because we want to prefetch for both logged in and guest users.

  if (router.asPath.includes("/auth/callback/google")) {
    // for Google login redirect
    return <Component {...pageProps} />;
  }
  return (
    <Fragment>
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
