import { z } from "zod";

export const getPublicUniversitiesSchema = z.object({
  search: z.string(),
  state: z.string(),
  conference: z.string(),
  division: z.string(),
  category: z.string(),
  region: z.string(),
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const getMyUniversitiesSchema = z.object({
  search: z.string(),
  state: z.string(),
  conference: z.string(),
  division: z.string(),
  category: z.string(),
  region: z.string(),
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const getMyInterestedUniversitiesSchema = z.object({
  search: z.string(),
  state: z.string(),
  conference: z.string(),
  division: z.string(),
  category: z.string(),
  region: z.string(),
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(100).default(9),
});

export const toggleInterestInUniSchema = z.object({
  uniId: z.string(),
  interested: z.boolean(),
});
