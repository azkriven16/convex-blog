import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Star, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "shadcn/ui Libraries",
  description: "A curated collection of libraries built using shadcn/ui",
  category: "web dev",
  authors: [{ name: "Euger Bonete" }],
};

export default function LibrariesPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Package className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Open Source
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Built with{" "}
          <span className="underline decoration-primary decoration-4 underline-offset-4">
            shadcn/ui
          </span>
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A curated collection of open-source libraries, components, and tools
          crafted on top of shadcn/ui to supercharge your next project.
        </p>
      </div>

      <Suspense fallback={<LibraryListSkeleton />}>
        <LoadLibraryList />
      </Suspense>
    </div>
  );
}

async function LoadLibraryList() {
  "use cache";
  cacheLife("hours");
  cacheTag("libraries");

  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((library) => (
        <Card
          key={library._id}
          className="bg-secondary rounded-xl shadow-md overflow-hidden pt-0 flex flex-col hover:shadow-lg transition-shadow duration-200"
        >
          <div className="relative h-44 overflow-hidden bg-muted">
            <Image
              src={
                library.imageUrl ??
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop"
              }
              alt={library.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/libraries/${library._id}`}>
                <h2 className="text-lg font-bold leading-tight hover:text-primary transition-colors">
                  {library.title}
                </h2>
              </Link>
              <Badge
                variant="secondary"
                className="shrink-0 flex items-center gap-1"
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">4.9</span>
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="outline" className="text-xs">
                shadcn/ui
              </Badge>
              <Badge variant="outline" className="text-xs">
                React
              </Badge>
              <Badge variant="outline" className="text-xs">
                TypeScript
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {library.body}
            </p>
          </CardContent>

          <CardFooter className="flex gap-2 pt-0">
            <Link
              href={`/libraries/${library._id}`}
              className={buttonVariants({ size: "sm", className: "flex-1" })}
            >
              View Library
            </Link>
            <Link
              href={`https://github.com`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function LibraryListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-44 w-full rounded-xl" />
          <div className="space-y-2 px-1">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
