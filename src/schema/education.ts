import { z } from "zod";

export const educationCreateSchema = z.object({
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const educationReadSchema = z.object({
  id: z.number(),
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const educationUpdateSchema = z.object({
  id: z.number(),
  description: z.string().nullable(),
  active: z.boolean().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export const educationDeleteSchema = z.object({
  id: z.number(),
});

export const educationReadForUserSchema = z.object({
  id: z.string(),
});
