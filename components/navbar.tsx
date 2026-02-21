"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import SearchInput from "./SearchInput";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError: async (error) => {
          toast.error(error.error.message);
        },
      },
    });
  }

  return (
    <header className="flex items-center justify-around py-4">
      <Link href="/" className="font-bold text-xl italic">
        NextBlog
      </Link>

      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className="flex justify-between items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? (
          <Loader2Icon className="animate-spin size-4" />
        ) : isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            {" "}
            <Link href="/auth/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
