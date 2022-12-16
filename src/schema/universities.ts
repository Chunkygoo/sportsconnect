import { z } from "zod";

export const getPublicUniversitiesSchema = z.object({
  search: z.string().default(""),
  state: z.string().default(""),
  conference: z.string().default(""),
  division: z.string().default(""),
  category: z.string().default(""),
  region: z.string().default(""),
  cursor: z.string().default("").nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const getMyUniversitiesSchema = z.object({
  search: z.string().default(""),
  state: z.string().default(""),
  conference: z.string().default(""),
  division: z.string().default(""),
  category: z.string().default(""),
  region: z.string().default(""),
  cursor: z.string().default("").nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const getMyInterestedUniversitiesSchema = z.object({
  search: z.string().default(""),
  state: z.string().default(""),
  conference: z.string().default(""),
  division: z.string().default(""),
  category: z.string().default(""),
  region: z.string().default(""),
  cursor: z.string().default("").nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const toggleInterestInUniSchema = z.object({
  uniId: z.string(),
  interested: z.boolean(),
});
