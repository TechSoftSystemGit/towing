import { BatteryCharging, Bike, CircleDot, Clock3, MapPin, Phone, Route, ShieldAlert, Truck, Wrench } from "lucide-react";
import Image from "next/image";
import { business } from "../lib/business";
import PageExtras from "./page-extras";
import PageFrame from "./page-frame";
import ServiceMarquee from "./service-marquee";
import { commonFaq } from "../lib/content";
import { meta, Schema } from "../lib/seo";
import { Actions, FaqShowcase, link, Visual } from "./ui";

export const metadata = meta();

const featuredServices = [
  { title: "Dépannage 24h/24", Icon: Wrench, details: ["Voiture en panne", "Batterie à plat", "Remorquage si nécessaire"], href: "/depannage-voiture/", action: "Options de dépannage" },
  { title: "Transport de véhicules", Icon: Route, details: ["Enlèvement à l’adresse convenue", "Livraison à destination", "Trajet longue distance sur devis"], href: "/transport-vehicule-longue-distance/", action: "Préparer un transport" },
  { title: "Assistance pneus", Icon: CircleDot, details: ["Pneu crevé ou roue à plat", "Aide avec une roue de secours", "Remorquage si besoin"], href: "/depannage-pneu-creve/", action: "Voir l’assistance pneus" },
];

const serviceFacts = [
  { Icon: Clock3, value: "24h/24", label: "Assistance téléphonique" },
  { Icon: MapPin, value: "94000", label: "Base à Créteil" },
  { Icon: Truck, value: "4 types", label: "Voiture, moto, utilitaire, poids lourd" },
  { Icon: Route, value: "Sur devis", label: "Transport longue distance" },
];

const serviceGallery = [
  { slug: "remorquage-voiture", title: "Remorquage voiture", Icon: Truck, image: "client/resized/berline-sur-plateau", description: "Faites transférer votre voiture immobilisée vers une destination convenue." },
  { slug: "depannage-pneu-creve", title: "Assistance pneus", Icon: CircleDot, image: "client/resized/service-pneu", description: "Décrivez la crevaison et indiquez si vous avez une roue de secours." },
  { slug: "depannage-batterie", title: "Dépannage batterie", Icon: BatteryCharging, image: "client/resized/service-batterie", description: "ALF évalue les possibilités d’aide au démarrage selon le véhicule." },
  { slug: "transport-vehicule-longue-distance", title: "Transport longue distance", Icon: Route, image: "client/resized/service-longue-distance", description: "Organisez l’enlèvement et la livraison de votre véhicule sur devis." },
  { slug: "remorquage-utilitaire", title: "Remorquage utilitaire", Icon: Truck, image: "client/resized/camion-frigorifique", description: "Précisez le gabarit et le chargement de votre fourgon avant la prise en charge." },
  { slug: "remorquage-moto", title: "Remorquage moto", Icon: Bike, image: "client/resized/moto-sur-plateau", description: "Préparez le transfert d’une moto immobilisée vers un atelier." },
];
const transportComparison = [
  { title: "Remorquage d’urgence", href: "/remorquage-creteil/", action: "Remorquage à Créteil", items: ["Pour un véhicule immobilisé par une panne ou une crevaison.", "Ligne d’assistance ouverte 24h/24 et 7j/7.", "Indiquez votre position, l’état du véhicule et si les roues tournent.", "Convenez du lieu de dépôt avant le transfert."] },
  { title: "Transport planifié", href: "/transport-vehicule-longue-distance/", action: "Transport longue distance", items: ["Pour un enlèvement et une livraison à organiser à l’avance.", "Communiquez les deux adresses et les dates souhaitées.", "Précisez si le véhicule roule et qui remettra les clés.", "Prestation sur devis, selon le trajet et l’accès."] },
];
const towingDirectory = [
  { slug: "remorquage-voiture", title: "Remorquage de voiture", image: "client/resized/mercedes-glc" },
  { slug: "depannage-pneu-creve", title: "Assistance pneu crevé", image: "client/resized/service-pneu", description: "Indiquez la roue concernée et si vous avez une roue de secours." },
  { slug: "remorquage-creteil", title: "Remorquage d’urgence", image: "client/resized/depannage-en-ville" },
  { slug: "depannage-utilitaire", title: "Dépannage utilitaire", image: "client/resized/depanneuses-en-parc" },
  { slug: "depannage-batterie", title: "Dépannage batterie", image: "client/resized/service-batterie" },
  { slug: "remorquage-utilitaire", title: "Remorquage utilitaire", image: "client/resized/camion-frigorifique" },
  { slug: "remorquage-moto", title: "Remorquage moto", image: "client/resized/moto-sur-plateau" },
  { slug: "transport-vehicule-longue-distance", title: "Transport longue distance", image: "client/resized/porte-voitures-lohr" },
  { slug: "remorquage-poids-lourd", title: "Remorquage poids lourd", image: "client/resized/camion-frigorifique" },
  { slug: "enlevement-epave-gratuit", title: "Enlèvement d’épave gratuit", image: "client/resized/depanneuses-mercedes", description: "ALF enlève gratuitement les voitures dont vous souhaitez vous séparer, y compris les véhicules en fin de vie." },
];

export default function Home() {
  return <PageFrame>
    <Schema/>
    <section className="hero cinematic-hero">
      <Image className="hero-backdrop" src="/images/hero-remorquage-nuit-preview.webp" alt="" fill preload sizes="100vw"/>
      <div className="wrap hero-stage">
        <div className="hero-wordmark" aria-hidden="true">ALF REMORQUAGE</div>
        <div className="hero-copy">
          <p className="eyebrow"><Clock3 aria-hidden="true"/> ASSISTANCE {business.availability.toUpperCase()}</p>
          <h1 className="hero-heading">
            <span>Dépannage</span>{" "}<span>et</span>{" "}<span>remorquage</span>{" "}<em>à Créteil.</em>
          </h1>
          <p>Voiture, moto, utilitaire ou poids lourd immobilisé dans le Val-de-Marne ?</p>
        </div>
        <aside className="hero-assistance" aria-label="Contacter ALF"><h2>Votre véhicule est immobilisé ?</h2><p>Indiquez votre position, le véhicule et la panne. ALF vous aide à déterminer la prise en charge.</p><Actions/><a className="text-link" href="/depannage-remorquage/">Voir nos services</a></aside>
      </div>
    </section>
    <ServiceMarquee/>
    <section className="towing-intro" aria-labelledby="towing-intro-title"><div className="wrap section">
      <p className="eyebrow towing-intro-label">ALF Dépannage &amp; Remorquage</p>
      <div className="towing-intro-grid">
        <div className="towing-intro-side">
          <a className="towing-intro-card" href="/remorquage-creteil/">
            <Visual name={"client/resized/depanneuses-mercedes"}/>
            <div><h3>Remorquage 24h/24 à Créteil</h3><p>Pour une voiture immobilisée, indiquez le lieu de prise en charge et la destination souhaitée.</p></div>
          </a>
          <a className="button towing-intro-phone" href={business.tel}><Phone aria-hidden="true"/>{business.phone}</a>
        </div>
        <div className="towing-intro-main">
          <h2 id="towing-intro-title">Dépannage et remorquage dans le Val-de-Marne</h2>
          <div className="towing-intro-text">
            <div><span className="towing-intro-status"><Clock3 aria-hidden="true"/> {business.availability}</span><p>Une panne à Créteil ou dans le 94 ? Appelez ALF avec le modèle du véhicule et les symptômes. L’équipe vérifie si une intervention sur place est possible.</p></div>
            <p>ALF étudie aussi le transfert de voitures, motos, utilitaires et poids lourds. Pour un enlèvement sur longue distance, préparez les adresses de départ et d’arrivée afin de demander un devis.</p>
          </div>
          <Image className="towing-intro-wide" src="/images/client/resized/berline-sur-plateau.webp" alt="Berline blanche sur le plateau d’une dépanneuse jaune" width={1200} height={800} sizes="(max-width: 760px) 100vw, 66vw"/>
        </div>
      </div>
    </div></section>
    <section className="towing-directory" aria-labelledby="towing-directory-title"><div className="wrap section">
      <p className="eyebrow towing-intro-label">ALF Dépannage &amp; Remorquage</p>
      <h2 id="towing-directory-title">Nos services de dépannage et de remorquage</h2>
      <p>Découvrez les solutions pour les voitures, motos, utilitaires et poids lourds à Créteil et dans le Val-de-Marne.</p>
      <div className="towing-directory-grid">
        {[towingDirectory.slice(0, 5), towingDirectory.slice(5)].map((column, columnIndex) => <div key={column[0].slug}>
          <ol start={columnIndex === 0 ? 1 : 6}>
            {column.map(({ slug, title, image, description }, index) => <li key={slug}>
              <a href={link(slug)}>
                <div className="towing-directory-thumb"><Visual name={image}/></div>
                <div className="towing-directory-row"><span aria-hidden="true">{String(index + (columnIndex === 0 ? 1 : 6)).padStart(2, "0")}</span><div><h3>{title}</h3>{description && <p>{description}</p>}</div></div>
              </a>
            </li>)}
          </ol>
          {columnIndex === 1 && <a className="towing-directory-call" href={business.tel}><span>Assistance {business.availability}</span><strong><Phone aria-hidden="true"/> {business.phone}</strong></a>}
        </div>)}
      </div>
    </div></section>
    <section className="wrap section featured" aria-labelledby="featured-title">
      <h2 id="featured-title" className="sr">Services de dépannage, remorquage et transport</h2>
      <div className="featured-grid">{featuredServices.map(({ title, Icon, details, href, action }) => <article key={href}><h3><Icon aria-hidden="true"/>{title}</h3><div><ul>{details.map(detail => <li key={detail}>{detail}</li>)}</ul><a className="button dark" href={href}>{action}</a></div></article>)}</div>
    </section>
    <section className="wrap section assistance" aria-labelledby="assistance-title">
      <div className="assistance-heading"><div><p className="eyebrow">Pourquoi choisir ALF ?</p><h2 id="assistance-title">L’assistance routière quand vous en avez besoin</h2></div><a className="button primary" href={business.tel}><Phone aria-hidden="true"/>{business.phone}</a></div>
      <div className="assistance-layout">
        <article className="assistance-main"><div className="assistance-card-icon"><Truck aria-hidden="true"/></div><h3>Dépannage ou remorquage selon la panne</h3><p>ALF vérifie si le véhicule peut repartir après une intervention sur place ou s’il doit être transféré.</p><Visual name="client/resized/mercedes-glc" alt="Mercedes GLC noire chargée sur un plateau"/></article>
        <article className="assistance-call"><div className="assistance-card-icon"><Clock3 aria-hidden="true"/></div><h3>Un interlocuteur 24h/24</h3><p>Appelez de jour comme de nuit avec votre position et les symptômes de la panne.</p><Visual name="client/resized/service-pneu" alt="Technicien remplaçant une roue de voiture"/></article>
        <article><div className="assistance-card-icon"><MapPin aria-hidden="true"/></div><h3>Une base à Créteil</h3><p>Le Val-de-Marne est notre secteur prioritaire d’intervention.</p></article>
        <article><div className="assistance-card-icon"><Route aria-hidden="true"/></div><h3>Un transfert préparé avec vous</h3><p>Précisez l’accès au véhicule et le lieu de dépôt souhaité.</p></article>
        <article className="assistance-vehicles"><div><ShieldAlert aria-hidden="true"/><h3>Voitures, motos, utilitaires et poids lourds</h3></div><p>La prise en charge dépend du véhicule et des conditions d’accès.</p></article>
      </div>
    </section>
    <section className="service-gallery" aria-labelledby="service-gallery-title"><div className="wrap section">
      <header className="gallery-heading"><p className="eyebrow">Nos services</p><h2 id="service-gallery-title">Dépannage, remorquage et transport de véhicules</h2></header>
      <div className="gallery-grid">{serviceGallery.map(({ slug, title, Icon, image, description }) => <article key={slug}>
        <div className="gallery-image">
          <Visual name={image}/>
          <span><Icon aria-hidden="true"/></span>
        </div>
        <div className="gallery-copy"><h3>{title}</h3><p>{description}</p><a href={link(slug)}>En savoir plus <span className="sr">sur {title.toLowerCase()}</span></a></div>
      </article>)}</div>
    </div></section>
    <section className="wrap section transport-comparison" aria-labelledby="transport-comparison-title">
      <div className="gallery-heading"><p className="eyebrow">Urgence ou réservation</p><h2 id="transport-comparison-title">Remorquage d’urgence ou transport planifié ?</h2></div>
      <div className="comparison-layout">
        <div className="comparison-photo"><Visual name="client/resized/porte-voitures-rue" alt="Camion porte-voitures stationné dans une rue"/></div>
        <div className="comparison-panel">
          <div className="comparison-options">{transportComparison.map(({ title, href, action, items }) => <article key={href}>
            <h3>{title}</h3>
            <ul>{items.map(item => <li key={item}><CircleDot aria-hidden="true"/><span>{item}</span></li>)}</ul>
            <a href={href}>{action}</a>
          </article>)}</div>
          <p>Un doute sur la prise en charge ? <a href={business.tel}>Appelez ALF au {business.phone}</a>.</p>
        </div>
      </div>
    </section>
    <section className="process-band" aria-labelledby="process-title"><div className="wrap section">
      <div className="gallery-heading"><p className="eyebrow">Comment ça marche</p><h2 id="process-title">Votre prise en charge en quatre étapes</h2></div>
      <ol className="steps">
        <li><span className="step-index" aria-hidden="true">01</span><h3>Contactez ALF</h3><p>Pour une panne urgente, <a href={business.tel}>appelez-nous au {business.phone}</a>. Vous pouvez aussi <a href="/contact/">préparer votre demande</a>.</p></li>
        <li><span className="step-index" aria-hidden="true">02</span><h3>Décrivez la situation</h3><p>Indiquez où vous êtes, le type de véhicule et les symptômes. Précisez si l’accès est difficile.</p></li>
        <li><span className="step-index" aria-hidden="true">03</span><h3>Confirmez la prestation</h3><p>L’équipe examine les options avec vous. Validez les conditions et, si nécessaire, la destination.</p></li>
        <li><span className="step-index" aria-hidden="true">04</span><h3>Prise en charge</h3><p>Selon la solution convenue, ALF intervient sur place ou transfère le véhicule au lieu de dépôt.</p></li>
      </ol>
    </div></section>
    <div className="wrap section section-compact"><div className="safety"><ShieldAlert aria-hidden="true"/><div><h3>En cas de panne sur autoroute</h3><p>{commonFaq[2][1]}</p></div></div></div>
    <FaqShowcase items={commonFaq}/>
    <PageExtras slug="home"/>
    <section className="coverage-band"><div className="wrap section">
      <h2>Depuis Créteil, <span>près de vous</span></h2>
      <div className="coverage-layout">
        <div><p>Basée à Créteil, ALF intervient en priorité dans le Val-de-Marne. Pour Paris et le reste de l’Île-de-France, appelez-nous avec votre position pour vérifier la prise en charge.</p><div className="coverage-actions"><Actions compact/><a className="button dark" href="/zones-intervention/">Voir les zones</a></div></div>
        <div className="coverage-graphic">
          <svg viewBox="0 0 320 232" aria-hidden="true">
            <defs><pattern id="coverage-grid" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="currentColor"/></pattern></defs>
            <path d="M15 83 42 70 48 45 77 45 93 26 129 33 151 13 177 30 210 26 227 50 255 47 266 70 301 89 294 117 307 144 284 160 272 192 238 197 213 220 190 201 163 211 139 192 109 204 91 186 61 182 54 156 28 143 40 121 18 111Z" fill="url(#coverage-grid)"/>
            <path d="M96 65c19-6 24 42 49 46 25 4 32-15 54-6s26 30 47 31" fill="none" stroke="var(--bg-primary)" strokeWidth="3" opacity=".75"/>
            <circle cx="180" cy="122" r="11" fill="var(--brand-red)" stroke="var(--bg-primary)" strokeWidth="4"/>
          </svg>
          <strong>Créteil et le<br/>Val-de-Marne (94)</strong>
        </div>
      </div>
    </div></section>
    <section className="wrap service-facts" aria-label="Informations sur l’assistance">
      <div className="service-facts-portrait"><Image src="/images/technicien-assistance-gauche.webp" alt="" fill unoptimized loading="eager" fetchPriority="low"/></div>
      <ul>{serviceFacts.map(({ Icon, value, label }) => <li key={value}>
        <span className="service-fact-icon" aria-hidden="true"><Icon/></span>
        <strong>{value}</strong>
        <span className="service-fact-label">{label}</span>
      </li>)}</ul>
    </section>
  </PageFrame>;
}
