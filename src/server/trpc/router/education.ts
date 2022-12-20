import { TRPCError } from "@trpc/server";
import {
  educationCreateSchema,
  educationDeleteSchema,
  educationReadForUserSchema,
  educationUpdateSchema,
} from "../../../schema/education";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const educationRouter = router({
  createEducation: protectedProcedure
    .input(educationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        if (
          (
            await ctx.prisma.userInfo.findUniqueOrThrow({
              where: {
                id: ctx.session.getUserId(),
              },
              select: {
                educations: true,
              },
            })
          ).educations.length >= 5
        ) {
          // only allow 5 educations per user
          return;
        }
        const res = await ctx.prisma.education.create({
          data: {
            description: input.description,
            active: input.active,
            startDate: input.startDate,
            endDate: input.endDate,
            owner: {
              connect: {
                id: ctx.session.getUserId(),
              },
            },
          },
        });
        return res.id;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
  getEducations: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (
        await ctx.prisma.userInfo.findUniqueOrThrow({
          where: {
            id: ctx.session.getUserId(),
          },
          select: {
            educations: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        })
      ).educations;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: (error as Error).message,
        cause: error,
      });
    }
  }),
  updateEducation: protectedProcedure
    .input(educationUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userInfo.update({
          where: {
            id: ctx.session.getUserId(),
          },
          data: {
            educations: {
              update: {
                where: {
                  id: input.id,
                },
                data: {
                  description: input.description,
                  active: input.active,
                  startDate: input.startDate,
                  endDate: input.endDate,
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
  deleteEducation: protectedProcedure
    .input(educationDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.education.delete({
          where: {
            id: input.id,
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
  getEducationsForUser: publicProcedure
    .input(educationReadForUserSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.education.findMany({
          where: {
            ownerId: input.id,
          },
          orderBy: {
            createdAt: "asc",
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
