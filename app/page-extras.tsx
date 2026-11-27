import Image from "next/image";
import { Check, CircleHelp, ClipboardList, MapPin, Phone, Route, Wrench } from "lucide-react";
import { business } from "../lib/business";
import { pageExtras } from "../lib/page-extras";
import { informationDetailPhotos, servicePhotos, servicePhotoSrc } from "../lib/service-photos";
import { link } from "./ui";
import "./page-extras.css";

const icons = {
  tiles: Wrench,
  list: Check,
  numbered: ClipboardList,
  offset: MapPin,
  featured: CircleHelp,
};

export default function PageExtras({ slug }: { slug: string }) {
  const [photoLayout, cardLayout, photo, photoTitle, intro, cardsTitle, ...cards] = pageExtras[slug];
  const stock = servicePhotos[slug]?.detail || informationDetailPhotos[slug];
  const Icon = icons[cardLayout];
  const cutout = !stock && (photo === "technicien-assistance-preview" || photo === "hero-cab-over-preview");
  const imageSizes = photoLayout === "banner" || photoLayout === "stack"
    ? "100vw"
    : "(max-width: 760px) 100vw, 55vw";

  return <>
    <section className="extras-photo" data-photo-layout={photoLayout} aria-labelledby="extra-photo-title">
      <div className="wrap extras-photo-inner">
        <div className="extras-photo-copy"><h2 id="extra-photo-title">{photoTitle}</h2><p>{intro}</p></div>
        <div className="extras-image" data-cutout={cutout || undefined}>
          <Image src={stock ? servicePhotoSrc(stock) : "/images/" + photo + ".webp"} alt={stock?.alt || ""} fill sizes={imageSizes}/>
        </div>
      </div>
    </section>
    <section className="extras-cards" data-card-layout={cardLayout} aria-labelledby="extra-cards-title">
      <div className="wrap extras-cards-inner">
        <h2 id="extra-cards-title">{cardsTitle}</h2>
        <ul>{cards.map(([title, description, route], index) => {
          const CardIcon = route === "call" ? Phone : route?.startsWith("transport-") ? Route : Icon;
          return <li key={title}>
            <span className="extras-card-icon" aria-hidden="true">{cardLayout === "numbered" ? String(index + 1).padStart(2, "0") : <CardIcon/>}</span>
            <div className="extras-card-copy">
              <h3>{title}</h3><p>{description}</p>
              {route && <a href={route === "call" ? business.tel : link(route)}>{route === "call" ? "Appeler ALF" : "En savoir plus"}<span className="sr">{route === "call" ? "" : " sur " + title.toLowerCase()}</span></a>}
            </div>
          </li>;
        })}</ul>
      </div>
    </section>
  </>;
}
