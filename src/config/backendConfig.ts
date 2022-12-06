import { deleteUser } from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import SessionNode from "supertokens-node/recipe/session";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import type { TypeInput } from "supertokens-node/types";
import { env } from "../env/server.mjs";
import { prisma } from "../server/db/client";
import { appInfo } from "./appInfo";

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: env.SUPERTOKENS_CONNECTION_URI,
      apiKey: env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              // here we are only overriding the function that's responsible
              // for signing in or signing up a user.
              thirdPartySignInUp: async (input) => {
                const res = await originalImplementation.thirdPartySignInUp(
                  input
                );
                if (res.createdNewUser) {
                  // don't user OK here as we the below logic to run only for signUp
                  try {
                    // created user, we need to create a new userInfo record for that user
                    await prisma.userInfo.create({
                      data: {
                        id: res.user.id,
                        email: res.user.email,
                      },
                    });
                  } catch (error) {
                    await deleteUser(res.user.id);
                    throw new Error((error as Error).message);
                  }
                }
                return res;
              },
              emailPasswordSignUp: async (input) => {
                const res = await originalImplementation.emailPasswordSignUp(
                  input
                );
                if (res.status === "OK") {
                  try {
                    // created user, we need to create a new userInfo record for that user
                    await prisma.userInfo.create({
                      data: {
                        id: res.user.id,
                        email: res.user.email,
                      },
                    });
                  } catch (error) {
                    await deleteUser(res.user.id);
                    throw new Error((error as Error).message);
                  }
                }
                return res;
              },
            };
          },
        },
        providers: [
          ThirdPartyEmailPasswordNode.Google({
            clientId:
              "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
            clientSecret: "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",
          }),
        ],
      }),
      SessionNode.init(),
      Dashboard.init({
        apiKey: env.SUPERTOKENS_DASHBOARD_API_KEY,
      }),
    ],
    isInServerlessEnv: true,
  };
};
