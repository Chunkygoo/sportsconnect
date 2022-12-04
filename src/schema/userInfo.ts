import { z } from "zod";

export const updateUserInfoSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: "Must be a valid email" }),
  name: z.string().nullable(),
  wechatId: z.string().nullable(),
  preferredName: z.string().nullable(),
  bio: z.string().nullable(),
  gender: z.string().nullable(),
  contactNumber: z.string().nullable(),
  currentAddress: z.string().nullable(),
  permanentAddress: z.string().nullable(),
  birthday: z.date().nullable(),
  public: z.boolean(),
  profilePhoto: z.object({ key: z.string() }).nullable(),
});

export const publicUserInfoSchema = z.object({
  id: z.string(),
});
