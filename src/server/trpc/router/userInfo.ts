import {
  publicUserInfoSchema,
  updateUserInfoSchema,
} from "../../../schema/userInfo";
import { publicProcedure, router } from "../trpc";

export const userInfoRouter = router({
  getCurrentUserInfo: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.userInfo.findUniqueOrThrow({
        where: {
          id: "1",
        },
        select: {
          id: true,
          email: true,
          name: true,
          wechatId: true,
          preferredName: true,
          bio: true,
          gender: true,
          contactNumber: true,
          currentAddress: true,
          permanentAddress: true,
          birthday: true,
          public: true,
          profilePhoto: {
            select: {
              key: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }),
  updateUserInfo: publicProcedure
    .input(updateUserInfoSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.userInfo.update({
          where: {
            id: "1",
          },
          data: {
            name: input.name,
            wechatId: input.wechatId,
            preferredName: input.preferredName,
            bio: input.bio,
            gender: input.gender,
            contactNumber: input.contactNumber,
            currentAddress: input.currentAddress,
            permanentAddress: input.permanentAddress,
            birthday: input.birthday,
            public: input.public,
          },
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),
  getPublicUserInfo: publicProcedure
    .input(publicUserInfoSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.userInfo.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          select: {
            id: true,
            email: true,
            name: true,
            wechatId: true,
            preferredName: true,
            bio: true,
            gender: true,
            contactNumber: true,
            currentAddress: true,
            permanentAddress: true,
            birthday: true,
            public: true,
            profilePhoto: {
              select: {
                key: true,
              },
            },
          },
        });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }),
});
