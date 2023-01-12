import { z } from "zod";

export const uploadImageSchema = z.object({
  key: z.string(),
});
