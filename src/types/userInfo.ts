// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";

import type { updateUserInfoSchema } from "../schema/userInfo";

export type UserInfoType = z.infer<typeof updateUserInfoSchema>;
