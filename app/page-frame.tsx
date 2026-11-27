import type { ReactNode } from "react";
import { Footer } from "./ui";

export default function PageFrame({ children }: { children: ReactNode }) {
  return <>
    <main id="contenu">{children}</main>
    <Footer/>
  </>;
}
