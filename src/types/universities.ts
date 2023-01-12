// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";

import type { getPublicUniversitiesSchema } from "../schema/universities";

export type UniversitiesType = z.infer<typeof getPublicUniversitiesSchema>;
