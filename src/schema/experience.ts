import { z } from "zod";

export const experienceCreateSchema = z.object({
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const experienceReadSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const experienceUpdateSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const experienceDeleteSchema = z.object({
  id: z.string(),
});

export const experienceReadForUserSchema = z.object({
  id: z.string(),
});
