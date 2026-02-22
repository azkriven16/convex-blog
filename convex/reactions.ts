import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { reactionTypeValidator } from "./constants";

export const getReactionByPostId = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("reactions")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();
    return data;
  },
});

export const createReaction = mutation({
  args: {
    postId: v.id("posts"),
    type: reactionTypeValidator,
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new ConvexError("Post not found");
    }

    return await ctx.db.insert("reactions", {
      postId: args.postId,
      type: args.type,
      userId: user._id,
    });
  },
});
