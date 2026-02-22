import { CommentSection } from "@/components/CommentSection";
import PostPresence from "@/components/PostPresence";
import Reactions from "@/components/Reactions";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { formatDate } from "@/lib/format-date";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PostDetailsProps {
  params: Promise<{ postId: Id<"posts"> }>;
}

export async function generateMetadata({
  params,
}: PostDetailsProps): Promise<Metadata> {
  const { postId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
    },
  };
}
export default async function PostDetailsPage({ params }: PostDetailsProps) {
  const { postId } = await params;

  const token = await getToken();

  const [post, preloadedComments, preloadedReactions, userId] =
    await Promise.all([
      await fetchQuery(api.posts.getPostById, { postId }),
      preloadQuery(api.comments.getCommentsByPostId, { postId }, { token }),
      preloadQuery(api.reactions.getReactionByPostId, { postId }, { token }),
      await fetchQuery(api.presence.getUserId, {}, { token }),
    ]);

  if (!userId) {
    return redirect("/auth/sign-in");
  }

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "ghost", className: "mb-4" })}
        href="/blog"
      >
        Back to Blog
      </Link>

      <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://plus.unsplash.com/premium_photo-1661963063875-7f131e02bf75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          fill
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-500
          "
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <div className="flex h-5 items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            Posted on : {formatDate(post._creationTime)}
          </p>
          <Separator orientation="vertical" />
          {userId && <PostPresence roomId={post._id} userId={userId} />}
          <Separator orientation="vertical" />
          {userId && <Reactions preloadedReactions={preloadedReactions} />}
        </div>
        <Separator className="my-8" />
        <p className="text-lg leading-relaxed text-foreground/90">
          {post.body}
        </p>
      </div>
      <Separator className="my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
