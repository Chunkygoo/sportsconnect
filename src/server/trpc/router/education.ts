import {
  educationCreateSchema,
  educationDeleteSchema,
  educationReadForUserSchema,
  educationUpdateSchema,
} from "../../../schema/education";
import { publicProcedure, router } from "../trpc";

export const educationRouter = router({
  createEducation: publicProcedure
    .input(educationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        if (
          (
            await ctx.prisma.userInfo.findUniqueOrThrow({
              where: {
                id: "1",
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
  getEducations: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.userInfo.findUniqueOrThrow({
        where: {
          id: "1",
        },
        select: {
          educations: true,
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }),
  updateEducation: publicProcedure
    .input(educationUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userInfo.update({
          where: {
            id: "1",
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
        throw new Error((error as Error).message);
      }
    }),
  deleteEducation: publicProcedure
    .input(educationDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.education.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),
  getEducationsForUser: publicProcedure
    .input(educationReadForUserSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.userInfo.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          select: {
            educations: true,
          },
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),
});
