// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";

import type {
  experienceCreateSchema,
  experienceDeleteSchema,
  experienceReadSchema,
  experienceUpdateSchema,
} from "../schema/experience";

export type experienceCreateType = z.infer<typeof experienceCreateSchema>;
export type experienceReadType = z.infer<typeof experienceReadSchema>;
export type experienceUpdateType = z.infer<typeof experienceUpdateSchema>;
export type experienceDeleteType = z.infer<typeof experienceDeleteSchema>;
