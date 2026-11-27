import type { ReactNode } from "react";
import { footerPhotos } from "../lib/service-photos";
import { Footer } from "./ui";

export default function PageFrame({ slug, children }: { slug: string; children: ReactNode }) {
  return <>
    <main id="contenu">{children}</main>
    <Footer photo={footerPhotos[slug]}/>
  </>;
}
