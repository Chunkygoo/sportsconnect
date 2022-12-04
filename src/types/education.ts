// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";

import type {
  educationCreateSchema,
  educationDeleteSchema,
  educationReadSchema,
  educationUpdateSchema,
} from "../schema/education";

export type educationCreateType = z.infer<typeof educationCreateSchema>;
export type educationReadType = z.infer<typeof educationReadSchema>;
export type educationUpdateType = z.infer<typeof educationUpdateSchema>;
export type educationDeleteType = z.infer<typeof educationDeleteSchema>;
