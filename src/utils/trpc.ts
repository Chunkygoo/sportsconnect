import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import SessionReact from "supertokens-auth-react/recipe/session";

import { type AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      abortOnUnmount: true,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch: async (url, options): Promise<Response> => {
            let res;
            try {
              res = await fetch(url, options);
              console.log("resresresresresresresresresresresresresresres");
              console.log(res);
              if (res.status === 500) {
                await SessionReact.attemptRefreshingSession();
                res = await fetch(url, options);
              }
            } catch (error) {
              console.log(
                "errorerrorerrorerrorerrorerrorerrorerrorerrorerrorerror"
              );

              console.log(error);
            }
            // console.log(url, options, res);
            // if (res.status === 500) {
            //   await SessionReact.attemptRefreshingSession();
            //   res = await fetch(url, options);
            // }

            // // if the response is a multi-status, we need to check all the responses
            // if (res.status === MULTI_STATUS) {
            //   const responses = await res.json();
            //   // if any of the responses is an unauthorized
            //   if (
            //     responses.some((r) => r.error.data.httpStatus === UNAUTHORIZED)
            //   ) {
            //     // then try to rerun all the requests after auth (some of them might not be UNAUTHORIZED, but not the end of the world)
            //     return await handleTrpcUnauthError(res, url, options);
            //   }
            // }

            // // in this case all the batched requests have the same code, the the whole batch can be handled
            // if (res.status === UNAUTHORIZED) {
            //   return await handleTrpcUnauthError(res, url, options);
            // }

            // // if nothing happens, carry on with the procedure
            return res;
          },
        }),
      ],
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
