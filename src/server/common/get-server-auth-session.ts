import { TRPCError } from "@trpc/server";
import { type GetServerSidePropsContext } from "next";
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
  } catch (error: any) {
    throw new TRPCError({
      code: "UNAUTHORIZED", // UNAUTHORIZED signals 401 which automatically triggers the frontend ST refresh API
      message: error.type,
      cause: error,
    });
  }
};
