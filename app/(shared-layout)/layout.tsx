import { Navbar } from "@/components/navbar";
import { PropsWithChildren } from "react";

export default function SharedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
