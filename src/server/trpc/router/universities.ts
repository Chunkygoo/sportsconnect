import { TRPCError } from "@trpc/server";
import { getUniversitiesSchema } from "../../../schema/universities";
import { publicProcedure, router } from "../trpc";

export const universityRouter = router({
  getUniversities: publicProcedure
    .input(getUniversitiesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const unis = await ctx.prisma.university.findMany({
          take: input.limit,
          where: {
            OR: [
              {
                name: {
                  contains: input.search === "" ? undefined : input.search,
                  mode: "insensitive",
                },
              },
              {
                city: {
                  contains: input.search === "" ? undefined : input.search,
                  mode: "insensitive",
                },
              },
            ],
            state: {
              equals:
                input.state === "" || input.state === "all"
                  ? undefined // undefined means do nothing
                  : input.state,
              mode: "insensitive",
            },
            conference: {
              equals:
                input.conference === "" || input.conference === "all"
                  ? undefined
                  : input.conference,
              mode: "insensitive",
            },
            division: {
              equals:
                input.division === "" || input.division === "all"
                  ? undefined
                  : input.division,
              mode: "insensitive",
            },
            category: {
              equals:
                input.category === "" || input.category === "all"
                  ? undefined
                  : input.category,
              mode: "insensitive",
            },
            region: {
              equals:
                input.region === "" || input.region === "all"
                  ? undefined
                  : input.region,
              mode: "insensitive",
            },
          },
          cursor: input.cursor ? { id: input.cursor } : undefined,
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
            conference: true,
            division: true,
            category: true,
            region: true,
            link: true,
          },
        });

        let nextCursor: typeof input.cursor | undefined = undefined;
        if (unis.length > input.limit) {
          nextCursor = unis[unis.length - 1]?.id;
        }
        return {
          unis,
          nextCursor,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
});
