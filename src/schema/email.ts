import { z } from "zod";

export const emailSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email({ message: "Must be a valid email" }),
  message: z.string().nullable(),
});
