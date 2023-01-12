import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  getServerHealth: publicProcedure.query(async () => {
    try {
      return {
        status: 200,
        message: "healthy",
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
