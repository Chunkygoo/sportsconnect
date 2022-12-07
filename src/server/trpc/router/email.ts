import { TRPCError } from "@trpc/server";
import SES from "aws-sdk/clients/ses";
import { env } from "../../../env/server.mjs";
import { emailSchema } from "../../../schema/email";
import { publicProcedure, router } from "../trpc";

const sesConfig = {
  apiVersion: "latest",
  accessKeyId: env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY_,
  region: env.AWS_REGION_,
  signatureVersion: "v4",
};

export const emailRouter = router({
  sendEmail: publicProcedure
    .input(emailSchema)
    .mutation(async ({ ctx, input }) => {
      const BODY_HTML = `<html>
        <head></head>
        <body>
        <p>Customer name: ${input.name}</p>
        <p>Customer email: ${input.email}</p>
        <p>Customer message: ${input.message}</p>
        </body>
        </html>`;
      const BODY_TEXT = `<html>
        <head></head>
        <body>
        <p>Customer name: ${input.name}</p>
        <p>Customer email: ${input.email}</p>
        <p>Customer message: ${input.message}</p>
        </body>
        </html>`;
      const SUBJECT = `Mail from SportsConnect Customer: ${input.email}`;
      const params = {
        Source: env.MAIL_FROM,
        Destination: {
          ToAddresses: [env.MAIL_TO],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: BODY_HTML,
            },
            Text: {
              Charset: "UTF-8",
              Data: BODY_TEXT,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: SUBJECT,
          },
        },
      };
      try {
        const ses = new SES(sesConfig);
        const sendEmail = ses.sendEmail(params).promise();
        sendEmail.then((data) => {
          console.log(data);
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
});
