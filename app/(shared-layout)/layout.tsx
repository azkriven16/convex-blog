import Footer01 from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Navbar2 from "@/components/navbar2";
import { PropsWithChildren } from "react";

export default function SharedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar2 />
      {children}
      <Footer01 />
    </>
  );
}
