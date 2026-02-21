import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute  top-5 left-5">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeftIcon className="size-4" /> Go back
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
