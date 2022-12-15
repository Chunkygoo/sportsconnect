import { TRPCError } from "@trpc/server";
import {
  getMyInterestedUniversitiesSchema,
  getMyUniversitiesSchema,
  getPublicUniversitiesSchema,
  toggleInterestInUniSchema,
} from "../../../schema/universities";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const universityRouter = router({
  getPublicUniversities: publicProcedure
    .input(getPublicUniversitiesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const unis = (
          await ctx.prisma.university.findMany({
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
          })
        ).map((uni) => {
          return { ...uni, interested: false };
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
  getMyUniversities: protectedProcedure
    .input(getMyUniversitiesSchema)
    .query(async ({ ctx, input }) => {
      try {
        // Promise.all rejects faster https://stackoverflow.com/questions/46889290/waiting-for-more-than-one-concurrent-await-operation
        const [allUnis, myUnis] = await Promise.all([
          ctx.prisma.university.findMany({
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
          }),
          ctx.prisma.userInfo.findUniqueOrThrow({
            where: {
              id: ctx.session?.getUserId(),
            },
            select: { unis: true },
          }),
        ]);
        const myUniIds = myUnis.unis.map((myUni) => {
          return { id: myUni.id };
        });
        // hashSet for performance gain
        const myUniIdsHashSet = new Set(myUniIds);
        // const myUniIdsHashMap = myUniIds.reduce(
        //   (acc: Record<string, string>, myUniId) => {
        //     acc[myUniId.id] = myUniId.id;
        //     return acc;
        //   },
        //   {}
        // );
        const unis = allUnis.map((uni) => {
          if (uni.id in myUniIdsHashSet) {
            return { ...uni, interested: true };
          }
          return { ...uni, interested: false };
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
  getMyInterestedUniversities: protectedProcedure
    .input(getMyInterestedUniversitiesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const unis = (
          await ctx.prisma.university.findMany({
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
              userInfo: {
                // check the single uni's userInfo field and see if some of them has the id = ctx.session?.getUserId(),
                some: {
                  id: ctx.session?.getUserId(),
                },
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
          })
        ).map((uni) => {
          return { ...uni, interested: true };
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
  toggleInterestInUni: protectedProcedure
    .input(toggleInterestInUniSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.interested) {
          await ctx.prisma.userInfo.update({
            where: {
              id: ctx.session?.getUserId(),
            },
            data: {
              unis: {
                disconnect: {
                  id: input.uniId,
                },
              },
            },
          });
        } else {
          await ctx.prisma.userInfo.update({
            where: {
              id: ctx.session?.getUserId(),
            },
            data: {
              unis: {
                connect: {
                  id: input.uniId,
                },
              },
            },
          });
        }
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
});
