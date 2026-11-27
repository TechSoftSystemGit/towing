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

  return <section className="page-hero">
    <div className="wrap page-hero-inner">
      {children}
    </div>
    <Image className="page-hero-backdrop" src={src} alt={official ? officialAlt || "" : photo.alt} fill preload sizes="100vw"/>
  </section>;
}
