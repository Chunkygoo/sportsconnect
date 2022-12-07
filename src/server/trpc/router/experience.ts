import { TRPCError } from "@trpc/server";
import {
  experienceCreateSchema,
  experienceDeleteSchema,
  experienceReadForUserSchema,
  experienceUpdateSchema,
} from "../../../schema/experience";
import { publicProcedure, router } from "../trpc";

export const experienceRouter = router({
  createExperience: publicProcedure
    .input(experienceCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        if (
          (
            await ctx.prisma.userInfo.findUniqueOrThrow({
              where: {
                id: ctx.session?.getUserId(),
              },
              select: {
                experiences: true,
              },
            })
          ).experiences.length >= 5
        ) {
          // only allow 5 experiences per user
          return;
        }
        const res = await ctx.prisma.experience.create({
          data: {
            description: input.description,
            active: input.active,
            startDate: input.startDate,
            endDate: input.endDate,
            owner: {
              connect: {
                id: ctx.session?.getUserId(),
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
  getExperiences: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.experience.findMany({
        where: {
          ownerId: ctx.session?.getUserId(),
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
  updateExperience: publicProcedure
    .input(experienceUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userInfo.update({
          where: {
            id: ctx.session?.getUserId(),
          },
          data: {
            experiences: {
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
  deleteExperience: publicProcedure
    .input(experienceDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.experience.delete({
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
  getExperiencesForUser: publicProcedure
    .input(experienceReadForUserSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.experience.findMany({
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
