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
                id: "1",
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
                id: "1",
              },
            },
          },
        });
        return res.id;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),
  getExperiences: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.experience.findMany({
        where: {
          ownerId: "1",
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }),
  updateExperience: publicProcedure
    .input(experienceUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userInfo.update({
          where: {
            id: "1",
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
        throw new Error((error as Error).message);
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
        throw new Error((error as Error).message);
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
        throw new Error((error as Error).message);
      }
    }),
});
