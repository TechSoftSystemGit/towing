import Image from "next/image";
import { Pause, Play } from "lucide-react";
import "./service-marquee.css";

const services = [
  { image: "hero-tow-truck-preview", title: "Remorquage à Créteil", detail: "Assistance téléphonique 24h/24" },
  { image: "service-carburant-preview", title: "Erreur de carburant", detail: "Assistance pour véhicule immobilisé" },
  { image: "service-engins-preview", title: "Transport d’engins", detail: "Enlèvement et livraison sur devis" },
];

export default function ServiceMarquee() {
  return <div className="service-marquee" role="region" aria-label="Services ALF en bref">
    <input className="sr marquee-pause" id="marquee-pause" type="checkbox"/>
    <label className="marquee-control" htmlFor="marquee-pause">
      <span className="sr">Mettre le défilement en pause</span>
      <Pause aria-hidden="true"/><Play aria-hidden="true"/>
    </label>
    <div className="marquee-window">
      <ul className="marquee-list">
        {services.map(({ image, title, detail }) => <li key={image}>
          <Image src={`/images/${image}.webp`} alt="" width={72} height={52}/>
          <div><strong>{title}</strong><span>{detail}</span></div>
        </li>)}
      </ul>
    </div>
  </div>;
}
