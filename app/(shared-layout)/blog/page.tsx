import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
// import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

// export const dynamic = "force-static";

// export const revalidate = 30;

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog page",
  category: "web dev",
  authors: [{ name: "Euger Bonete" }],
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
          officia amet dolore praesentium neque, temporibus{" "}
        </p>
      </div>

      <Suspense fallback={<BlogListSkeleton />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  // "use cache";
  // cacheLife("hours");
  // cacheTag("blog");
  await connection();
  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card
          key={post._id}
          className="bg-secondary rounded-lg shadow-md overflow-hidden pt-0"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={
                post.imageUrl ??
                "https://plus.unsplash.com/premium_photo-1661963063875-7f131e02bf75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-lg font-semibold">{post.title}</h1>
            </Link>
            <p className="mt-2 text-muted-foreground">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/blog/${post._id}`} className={buttonVariants({})}>
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
