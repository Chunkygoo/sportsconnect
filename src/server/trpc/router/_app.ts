import { router } from "../trpc";
import { educationRouter } from "./education";
import { experienceRouter } from "./experience";
import { imageRouter } from "./image";
import { userInfoRouter } from "./userInfo";

export const appRouter = router({
  userInfo: userInfoRouter,
  image: imageRouter,
  education: educationRouter,
  experience: experienceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
