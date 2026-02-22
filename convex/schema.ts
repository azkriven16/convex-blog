import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { reactionTypeValidator } from "./constants";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    componentName: v.string(),
    tags: v.optional(v.array(v.string())),
  })
    .searchIndex("search_title", {
      searchField: "title",
    })
    .searchIndex("search_body", {
      searchField: "body",
    }),
  comments: defineTable({
    postId: v.id("posts"),
    body: v.string(),
    authorId: v.string(),
    authorName: v.string(),
  }),
  reactions: defineTable({
    postId: v.id("posts"),
    type: reactionTypeValidator,
    userId: v.string(),
  }),
});
