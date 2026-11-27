import type { Metadata } from "next";
import { business } from "../lib/business";
import { Header } from "./ui";
import SiteMotion from "./site-motion";
import "./styles.css";

export const metadata: Metadata = {
  robots: { index: business.indexable, follow: business.indexable },
  applicationName: business.name,
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" suppressHydrationWarning><head>
    <link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
    <link rel="preload" href="/fonts/barlow-condensed-800.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
    <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('alf-theme')==='night')document.documentElement.dataset.theme='night'}catch{}" }}/>
  </head><body><Header/>{children}<SiteMotion/></body></html>;
}
