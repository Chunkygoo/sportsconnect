// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
  MAIL_FROM: z.string(),
  MAIL_TO: z.string(),
  AWS_REGION_: z.string(),
  AWS_S3_BUCKET_NAME_: z.string(),
  AWS_ACCESS_KEY_ID_: z.string(),
  AWS_SECRET_ACCESS_KEY_: z.string(),
  APP_URL: z.string(),
  SUPERTOKENS_CONNECTION_URI: z.string(),
  SUPERTOKENS_API_KEY: z.string(),
  SUPERTOKENS_DASHBOARD_API_KEY: z.string(),
  SUPERTOKENS_GOOGLE_CLIENT_ID: z.string(),
  SUPERTOKENS_GOOGLE_CLIENT_SECRET: z.string(),
  SUPERTOKENS_EMAIL_VERIFICATION: z.enum(["OPTIONAL", "REQUIRED"]),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string(),
  // NEXT_PUBLIC_EMAIL_VERIFICATION: z
  //   .enum(["OPTIONAL", "REQUIRED"])
  //   .default("OPTIONAL"),
  NEXT_PUBLIC_AWS_S3_BUCKET_NAME: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_AWS_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  // NEXT_PUBLIC_EMAIL_VERIFICATION: process.env.NEXT_PUBLIC_EMAIL_VERIFICATION,
};
