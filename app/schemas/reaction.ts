import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
import { v } from "convex/values";

export const REACTION_TYPES = [
  "like",
  "love",
  "haha",
  "wow",
  "sad",
  "angry",
] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];

export const reactionTypeValidator = v.union(
  v.literal("like"),
  v.literal("love"),
  v.literal("haha"),
  v.literal("wow"),
  v.literal("sad"),
  v.literal("angry"),
);
export const reactionSchema = z.object({
  type: z.union([
    z.literal("like"),
    z.literal("love"),
    z.literal("haha"),
    z.literal("wow"),
    z.literal("sad"),
    z.literal("angry"),
  ]),
  postId: z.custom<Id<"posts">>(),
});
