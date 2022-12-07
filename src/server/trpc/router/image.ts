// import S3FileUpload from "react-s3";
import { TRPCError } from "@trpc/server";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { uploadImageSchema } from "../../../schema/profilePhoto";
import { publicProcedure, router } from "../trpc";

const s3Config = {
  apiVersion: "latest",
  accessKeyId: env.AWS_ACCESS_KEY_ID_,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY_,
  region: env.AWS_REGION_,
  signatureVersion: "v4",
};

export const imageRouter = router({
  getPreSignedURLForRead: publicProcedure
    .input(
      z.object({
        key: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const s3 = new S3(s3Config);
        const getUrl = s3.getSignedUrl("getObject", {
          Bucket: env.AWS_S3_BUCKET_NAME,
          Key: input.key,
          Expires: 900, // 15 mins
        });
        return {
          getUrl: getUrl,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
  getPreSignedURLForWrite: publicProcedure
    .input(
      z.object({
        fileType: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const s3 = new S3(s3Config);
        const ex = (decodeURIComponent(input.fileType) as string).split("/")[1];
        const key = `${randomUUID()}.${ex}`;
        const uploadUrl = s3.getSignedUrl("putObject", {
          Bucket: env.AWS_S3_BUCKET_NAME,
          Key: key,
          Expires: 60,
          ContentType: `image/${ex}`,
        });
        return {
          uploadUrl: uploadUrl,
          key: key,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
  deleteS3Object: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const s3 = new S3(s3Config);
        s3.deleteObject(
          {
            Bucket: env.AWS_S3_BUCKET_NAME,
            Key: input.key,
          },
          () => {
            return {
              status: 401,
            };
          }
        );
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
  updateImageMetaData: publicProcedure
    .input(uploadImageSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // create if not exists, else update
        await ctx.prisma.userInfo.update({
          where: {
            id: ctx.session?.getUserId(),
          },
          data: {
            profilePhoto: {
              upsert: {
                create: {
                  key: input.key,
                },
                update: {
                  key: input.key,
                },
              },
            },
          },
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
