import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  getMyInterestedUniversitiesSchema,
  getMyUniversitiesSchema,
  getPublicUniversitiesSchema,
  toggleInterestInUniSchema,
} from "../../../schema/universities";
import type { allUnisType } from "../../../types/GalleryItem";
import type { UniversitiesType } from "../../../types/universities";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const conditionalQuery = (
  input: UniversitiesType
): Prisma.UniversityFindManyArgs => {
  const nonConditionalsForQuery = {
    take: input.limit + 1,
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
  };
  const nonConditionalsForWhere: Prisma.UniversityWhereInput = {
    state: {
      equals:
        input.state === "" || input.state === "all"
          ? undefined // undefined means do nothing
          : input.state,
      //mode: "insensitive", // only need this if using Postgresql
    },
    conference: {
      equals:
        input.conference === "" || input.conference === "all"
          ? undefined
          : input.conference,
      //mode: "insensitive",
    },
    division: {
      equals:
        input.division === "" || input.division === "all"
          ? undefined
          : input.division,
      //mode: "insensitive",
    },
    category: {
      equals:
        input.category === "" || input.category === "all"
          ? undefined
          : input.category,
      //mode: "insensitive",
    },
    region: {
      equals:
        input.region === "" || input.region === "all"
          ? undefined
          : input.region,
      //mode: "insensitive",
    },
  };
  if (input.search !== "") {
    return {
      ...nonConditionalsForQuery,
      where: {
        OR: [
          {
            name: {
              contains: input.search,
              //mode: "insensitive",
            },
          },
          {
            city: {
              contains: input.search,
              //mode: "insensitive",
            },
          },
        ],
        ...nonConditionalsForWhere,
      },
    };
  }
  return {
    ...nonConditionalsForQuery,
    where: { ...nonConditionalsForWhere },
  };
};

const getNextCursor = (unis: allUnisType[], input: UniversitiesType) => {
  let nextCursor: typeof input.cursor | undefined = undefined;
  if (unis.length > input.limit) {
    const nextUni = unis.pop();
    nextCursor = nextUni?.id;
  }
  return nextCursor;
};

export const universityRouter = router({
  getPublicUniversities: publicProcedure
    .input(getPublicUniversitiesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const unis = (
          await ctx.prisma.university.findMany(conditionalQuery(input))
        ).map((uni) => {
          return { ...uni, interested: false };
        });
        const nextCursor = getNextCursor(unis, input);
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
          ctx.prisma.university.findMany(conditionalQuery(input)),
          ctx.prisma.userInfo.findUniqueOrThrow({
            where: {
              id: ctx.session.getUserId(),
            },
            select: { unis: true },
          }),
        ]);
        const myUniIds = myUnis.unis.map((myUni) => {
          return myUni.universityId;
        });
        // hashSet for performance gain
        const myUniIdsHashSet = new Set(myUniIds);
        const unis = allUnis.map((uni) => {
          if (myUniIdsHashSet.has(uni.id)) {
            return { ...uni, interested: true };
          }
          return { ...uni, interested: false };
        });
        const nextCursor = getNextCursor(unis, input);
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
        const queryResult = conditionalQuery(input);
        const where = {
          ...queryResult.where,
          userInfo: {
            // check the single uni's userInfo field and see if some of them has the id = ctx.session.getUserId(),
            some: {
              userInfoId: ctx.session.getUserId(),
            },
          },
        };
        const unis = (
          await ctx.prisma.university.findMany({
            ...queryResult,
            where: where,
          })
        ).map((uni) => {
          return { ...uni, interested: true };
        });
        const nextCursor = getNextCursor(unis, input);
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
          // implicit many to many connect
          // await ctx.prisma.userInfo.update({
          //   where: {
          //     id: ctx.session.getUserId(),
          //   },
          //   data: {
          //     unis: {
          //       disconnect: {
          //         id: input.uniId,
          //       },
          //     },
          //   },
          // });
          // Delete a connection with explicit many to many with composite key: https://stackoverflow.com/a/74007143, https://stackoverflow.com/a/68674033
          await ctx.prisma.userInfoOnUnis.delete({
            where: {
              userInfoId_universityId: {
                userInfoId: ctx.session.getUserId(),
                universityId: input.uniId,
              },
            },
          });
        } else {
          // implicit many to many disconnect
          // await ctx.prisma.userInfo.update({
          //   where: {
          //     id: ctx.session.getUserId(),
          //   },
          //   data: {
          //     unis: {
          //       connect: {
          //         id: input.uniId,
          //       },
          //     },
          //   },
          // });
          // Make a connection with explicit many to many with composite key
          await ctx.prisma.userInfoOnUnis.create({
            data: {
              userInfoId: ctx.session.getUserId(),
              universityId: input.uniId,
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
