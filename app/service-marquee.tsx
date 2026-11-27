import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { CSSProperties } from "react";
import "./service-marquee.css";

const services = [
  { image: "client/resized/service-remorquage", title: "Remorquage à Créteil", detail: "Assistance téléphonique 24h/24" },
  { image: "client/resized/service-erreur-carburant", title: "Erreur de carburant", detail: "Assistance pour véhicule immobilisé" },
  { image: "client/resized/service-engins-chantier", title: "Transport d’engins", detail: "Enlèvement et livraison sur devis" },
  { image: "client/resized/service-pneu", title: "Assistance pneus", detail: "Aide avec une roue de secours" },
  { image: "client/resized/moto-sur-plateau", title: "Dépannage moto", detail: "Une moto immobilisée après une panne" },
  { image: "client/resized/camion-frigorifique", title: "Remorquage poids lourd", detail: "Remorquage dans le 94" },
];

export default function ServiceMarquee() {
  return <div className="service-marquee" role="region" aria-label="Services ALF en bref">
    <input className="sr marquee-pause" id="marquee-pause" type="checkbox"/>
    <label className="marquee-control" htmlFor="marquee-pause">
      <span className="sr">Mettre le défilement en pause</span>
      <Pause aria-hidden="true"/><Play aria-hidden="true"/>
    </label>
    <div className="marquee-window">
      <ul className="marquee-list" style={{ "--marquee-count": services.length } as CSSProperties}>
        {services.map(({ image, title, detail }, index) => <li key={image} style={{ "--marquee-position": services.length - 1 - index } as CSSProperties}>
          <Image src={`/images/${image}.webp`} alt="" width={72} height={48}/>
          <div><strong>{title}</strong><span>{detail}</span></div>
        </li>)}
      </ul>
    </div>
  </div>;
}
