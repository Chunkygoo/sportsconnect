import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type SessionContainer } from "supertokens-node/recipe/session";
import { getServerAuthSession } from "../common/get-server-auth-session";

import { prisma } from "../db/client";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, SessionContainer>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  if (opts.session) {
    return {
      session: opts.session,
      prisma,
    };
  }
  return { prisma };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return await createContextInner({}); // unauthenticated
  }
  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
