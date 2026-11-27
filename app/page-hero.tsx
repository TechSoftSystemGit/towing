import Image from "next/image";
import { type ReactNode } from "react";
import { informationHeroPhotos, servicePhotos, servicePhotoSrc } from "../lib/service-photos";
import { media } from "./ui";

const sharedHeroOwners = new Map([
  ["hero-depannage-creteil", "home"],
  ["remorquage-voiture", "remorquage-voiture"],
  ["remorquage-poids-lourd", "remorquage-poids-lourd"],
]);

export default function PageHero({ slug, officialName, officialAlt, children }: {
  slug: string;
  officialName?: string;
  officialAlt?: string;
  children: ReactNode;
}) {
  const photo = servicePhotos[slug]?.hero || informationHeroPhotos[slug] || informationHeroPhotos["not-found"];
  const owner = officialName && sharedHeroOwners.get(officialName);
  const official = officialName && (!owner || owner === slug) && media(officialName + ".webp");
  const src = official ? "/images/" + officialName + ".webp" : servicePhotoSrc(photo);
  const clientPhoto = src.startsWith("/images/client/");

  return <section className="page-hero" data-client-photo={clientPhoto || undefined}>
    <div className="wrap page-hero-inner">
      {children}
    </div>
    <div className="page-hero-image">
      <Image className="page-hero-backdrop" src={src} alt={official ? officialAlt || "" : photo.alt} fill preload sizes={clientPhoto ? "(max-width: 760px) 100vw, 50vw" : "100vw"}/>
    </div>
  </section>;
}
