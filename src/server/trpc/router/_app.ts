import { router } from "../trpc";
import { educationRouter } from "./education";
import { emailRouter } from "./email";
import { experienceRouter } from "./experience";
import { healthRouter } from "./health";
import { imageRouter } from "./image";
import { universityRouter } from "./universities";
import { userInfoRouter } from "./userInfo";

export const appRouter = router({
  userInfo: userInfoRouter,
  image: imageRouter,
  education: educationRouter,
  experience: experienceRouter,
  email: emailRouter,
  health: healthRouter,
  university: universityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
