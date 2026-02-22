"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "../schemas/blog";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid data");
    }

    const token = await getToken();
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token },
    );

    if (!parsed.data.image) {
      throw new Error("Image is required");
    }

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      throw new Error("Image upload failed");
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
        componentName: parsed.data.componentName,
        tags: parsed.data.tags,
      },
      {
        token,
      },
    );
  } catch (error) {
    throw new Error("Image is required");
  }

  // revalidatePath("/blog");
  updateTag("blog");
  return redirect("/blog");
}
