import { z } from "zod";

export const getUniversitiesSchema = z.object({
  search: z.string().default(""),
  state: z.string().default(""),
  conference: z.string().default(""),
  division: z.string().default(""),
  category: z.string().default(""),
  region: z.string().default(""),
  link: z.string().default(""),
  cursor: z.string().default("").nullish(),
  limit: z.number().min(1).max(100).default(9),
});

// export const publicUserInfoSchema = z.object({
//   id: z.string().default(""),
// });
