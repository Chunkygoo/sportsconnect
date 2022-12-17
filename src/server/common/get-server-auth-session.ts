import { TRPCError } from "@trpc/server";
import { type GetServerSidePropsContext } from "next";
import { Error as SuperTokensError } from "supertokens-node";
import Session from "supertokens-node/recipe/session";
/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const { req, res } = ctx;
  try {
    return await Session.getSession(req, res);
  } catch (error) {
    if (SuperTokensError.isErrorFromSuperTokens(error)) {
      if (error.type === "TRY_REFRESH_TOKEN") {
        throw new TRPCError({
          code: "UNAUTHORIZED", // UNAUTHORIZED signals 401 which automatically triggers the frontend ST refresh API
          message: error.type,
          cause: error,
        });
      }
    }
    if (
      error instanceof Error &&
      error.message ===
        "Initialisation not done. Did you forget to call the SuperTokens.init function?" // Unauthenticated
    ) {
      return null; // null is returned as the sesion object
    }
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Random error occurred - should never get here",
      cause: error,
    });
  }
};
