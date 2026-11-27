import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { BatteryCharging, BookOpen, Building2, ChevronDown, CircleDot, CircleHelp, Clock3, ClipboardList, Mail, MapPin, Menu, MessageCircle, Phone, Route, Truck, Wrench } from "lucide-react";
import { business } from "../lib/business";
import { type ServiceStockPhoto, servicePhotoSrc } from "../lib/service-photos";
import LanguageMenu from "./language-menu";
import ServicesMenu from "./services-menu";
import ThemeToggle from "./theme-toggle";
import { groups, pages, services } from "../lib/content";

export const link = (slug: string) => slug ? "/" + slug + "/" : "/";
export const media = (name: string) => existsSync(join(process.cwd(), "public", "images", name));
export function Actions({ compact = false }: { compact?: boolean }) {
  return <div className="actions"><a className="button primary" href={business.tel}><Phone aria-hidden="true"/>{compact ? "Appeler" : "Appeler maintenant"}</a>{business.whatsapp && <a className="button secondary" href={business.whatsapp}><MessageCircle aria-hidden="true"/>WhatsApp</a>}</div>;
}
const navigation = [["", "Accueil"], ["depannage-remorquage", "Services"], ["zones-intervention", "Zones d’intervention"], ["a-propos", "À propos"], ["contact", "Contact"]];
function NavLinks() {
  return navigation.map(([slug, label]) => slug === "depannage-remorquage"
    ? <ServicesMenu key={slug}>
      <a className="services-menu-overview" href={link(slug)}>Tous les services</a>
      <div className="services-menu-grid">{groups.map(group => <div key={group}>
        <p>{group}</p>
        <ul>{services.filter(service => service.group === group).map(service => <li key={service.slug}><a href={link(service.slug)}>{service.label}</a></li>)}</ul>
      </div>)}</div>
    </ServicesMenu>
    : <a key={slug} href={link(slug)}>{label}</a>);
}
export function Brand({ priority = false }: { priority?: boolean }) {
  const official = media("logo-alf.webp");
  return <a className={"brand " + (official ? "brand-official" : "brand-crest")} href="/" aria-label={business.name}>
    {official
      ? <Image width={170} height={54} src="/images/logo-alf.webp" alt="" preload={priority}/>
      : <><Image width={447} height={480} src="/images/logo-alf-crest.webp" alt="" sizes="(max-width: 760px) 54px, 92px" preload={priority}/><span>DÉPANNAGE<br/>REMORQUAGE</span></>}
  </a>;
}
export function Header() {
  return <>
    <a className="skip" href="#contenu">Aller au contenu</a>
    <header className="site-header"><div className="wrap header">
      <Brand priority/>
      <div className="header-meta">
        <ul className="header-facts">
          <li><Clock3 aria-hidden="true"/><span><strong>Assistance routière</strong><small>{business.availability}</small></span></li>
          <li><MapPin aria-hidden="true"/><span><strong>{business.city}</strong><small>{business.department} (94)</small></span></li>
          <li><Truck aria-hidden="true"/><span><strong>Dépannage &amp; remorquage</strong><small>Voitures, motos, utilitaires et poids lourds</small></span></li>
        </ul>
        <a className="header-phone" href={business.tel}><strong><Phone aria-hidden="true"/>{business.phone}</strong><small>Urgences 24h/24</small></a>
      </div>
      <div className="header-nav-row">
        <nav className="desktop-nav" aria-label="Navigation principale"><NavLinks/></nav>
        <a className="button primary header-request" href="/contact/#contact-section-title">Demander de l’aide</a>
      </div>
      <details className="mobile-nav"><summary aria-label="Menu"><Menu aria-hidden="true"/><span>Menu</span></summary><nav aria-label="Navigation mobile"><NavLinks/></nav></details>
      <LanguageMenu/>
    </div></header>
  </>;
}
function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 11.6a8.8 8.8 0 0 1-13 7.8L3 21l1.5-4.6a8.8 8.8 0 1 1 16.3-4.8Z"/><path d="M9.2 7.7c-.7.1-1.1.8-1.1 1.7.2 2.7 2.9 5.4 5.6 5.9 1 .2 1.7-.3 1.9-.9l.2-.6-2.1-1.1-.8 1c-1.4-.6-2.3-1.5-2.9-2.9l.8-.8-1-2.3Z" fill="currentColor" stroke="none"/></svg>;
}
function FloatingChannel({ href, kind }: { href: string; kind: "whatsapp" | "email" }) {
  const whatsApp = kind === "whatsapp";
  const label = whatsApp ? "WhatsApp" : "E-mail";
  const icon = whatsApp ? <WhatsAppIcon/> : <Mail aria-hidden="true"/>;
  const className = "floating-" + kind;
  return href
    ? <a className={className} href={href} aria-label={"Contacter ALF par " + label} title={label}>{icon}</a>
    : <details className="floating-channel" name="floating-channel">
      <summary className={className} aria-label={label + " indisponible"} title={label}>{icon}</summary>
      <div className="floating-channel-panel"><p>{whatsApp ? "WhatsApp est indisponible pour le moment." : "Le contact par e-mail est indisponible pour le moment."}</p><a href={business.tel}>Appeler ALF</a></div>
    </details>;
}
export function Footer({ photo }: { photo: ServiceStockPhoto }) {
  const serviceLinks = [
    { slug: "depannage-remorquage", label: "Tous les services", Icon: Wrench },
    { slug: "depannage-creteil", label: "Dépannage à Créteil", Icon: MapPin },
    { slug: "remorquage-creteil", label: "Remorquage à Créteil", Icon: Truck },
    { slug: "depannage-batterie", label: "Dépannage batterie", Icon: BatteryCharging },
    { slug: "depannage-pneu-creve", label: "Dépannage pneu crevé", Icon: CircleDot },
    { slug: "transport-vehicule-longue-distance", label: "Transport longue distance", Icon: Route },
  ];
  const usefulLinks = [
    { slug: "a-propos", label: "L’entreprise", Icon: Building2 },
    { slug: "zones-intervention", label: "Zones d’intervention", Icon: MapPin },
    { slug: "faq", label: "Questions fréquentes", Icon: CircleHelp },
    { slug: "blog", label: "Conseils", Icon: BookOpen },
  ];

  return <><footer>
    <svg className="footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 61C175 39 375 1 560 14C780 28 895 85 1085 85C1214 85 1341 73 1440 55V90H0Z" fill="currentColor"/></svg>
    <section className="wrap footer-feature" aria-labelledby="footer-assistance-title">
      <div className="footer-feature-copy">
        <p className="eyebrow"><Clock3 aria-hidden="true"/>{business.availability}</p>
        <h2 id="footer-assistance-title">Besoin d’une assistance ?</h2>
        <p>Voitures, motos, utilitaires et poids lourds</p>
        <Actions/>
      </div>
      <figure className="footer-feature-photo">
        <Image src={servicePhotoSrc(photo)} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 42vw"/>
      </figure>
    </section>
    <div className="wrap footer">
      <div className="footer-company">
        <Brand/>
        <p><MapPin aria-hidden="true"/><span>{business.city} ({business.postalCode}) · {business.department}</span></p>
        <p><Route aria-hidden="true"/><span>Paris et Île-de-France</span></p>
      </div>
      <nav className="footer-links" aria-label="Services de dépannage">
        <h2>Services</h2>
        {serviceLinks.map(({ slug, label, Icon }) => <a key={slug} href={link(slug)}><Icon aria-hidden="true"/><span>{label}</span></a>)}
      </nav>
      <nav className="footer-links" aria-label="À propos d’ALF">
        <h2>À propos</h2>
        {usefulLinks.map(({ slug, label, Icon }) => <a key={slug} href={link(slug)}><Icon aria-hidden="true"/><span>{label}</span></a>)}
      </nav>
      <div className="footer-links">
        <h2>Contact</h2>
        <a className="footer-phone" href={business.tel}><Phone aria-hidden="true"/><span>{business.phone}</span></a>
        <a href="/contact/#contact-section-title"><ClipboardList aria-hidden="true"/><span>Préparer une demande</span></a>
        {business.email && <a href={"mailto:" + business.email}><Mail aria-hidden="true"/><span>Écrire à ALF</span></a>}
        {business.whatsapp && <a href={business.whatsapp}><WhatsAppIcon/><span>WhatsApp</span></a>}
      </div>
    </div>
    <div className="wrap footer-bottom">
      <div className="footer-signature">
        <span>© {business.name}</span>
        <span>Developed by <a href="https://techsoftsystem.com/">TechSoftSystem</a></span>
      </div>
      <nav aria-label="Informations légales"><a href="/mentions-legales/">Mentions légales</a><a href="/politique-confidentialite/">Confidentialité</a></nav>
    </div>
  </footer><nav className="floating-contact" aria-label="Raccourcis de contact">
    <FloatingChannel kind="whatsapp" href={business.whatsapp}/>
    <a className="floating-phone" href={business.tel} aria-label="Appeler ALF" title="Appeler ALF"><Phone aria-hidden="true"/><span>Appeler</span></a>
    <FloatingChannel kind="email" href={business.email ? "mailto:" + business.email : ""}/>
    <ThemeToggle/>
  </nav></>;
}
export function Visual({ name, alt, priority = false, preview }: { name?: string; alt?: string; priority?: boolean; preview?: { name: string; alt: string } }) {
  const file = name + ".webp";
  if (name && media(file)) return <div className="visual photo"><Image src={"/images/" + file} alt={alt || ""} fill preload={priority} sizes="(max-width: 760px) 100vw, (max-width: 1250px) 50vw, 610px"/></div>;
  if (preview) return <div className="visual photo"><Image src={"/images/" + preview.name + ".webp"} alt={preview.alt} fill sizes="(max-width: 760px) 90vw, 520px"/></div>;
  if (name === "hero-depannage-creteil") return <div className="visual recovery-art"><Image src="/images/hero-cab-over-preview.webp" alt="Illustration d’une dépanneuse à cabine blanche et plateau bleu" fill preload={priority} sizes="(max-width: 760px) 100vw, (max-width: 1250px) 50vw, 570px"/></div>;
  return <div className="visual drawing" aria-hidden="true"><svg viewBox="0 0 600 360" fill="none"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" stroke="currentColor" opacity=".13"/></pattern></defs><path d="M0 0h600v360H0z" fill="url(#grid)"/><path d="M65 270h475M65 89h470M100 63v234M502 63v234" stroke="currentColor" opacity=".3" strokeDasharray="5 7"/><g stroke="currentColor" strokeWidth="3" strokeLinejoin="round"><path d="M106 245v-24l17-11h261v-77h57l49 44v68h-29m-54 0H206m-55 0h-45m278-35v35m18-98h34l35 33h-69z"/><circle cx="179" cy="245" r="27"/><circle cx="434" cy="245" r="27"/><circle cx="179" cy="245" r="10"/><circle cx="434" cy="245" r="10"/><path d="M128 210l16-20 32-8 23-27h95l31 25 26 7 7 23m-178-29 24-19h36v19m9-19h41l24 19h-65m-99 17h13m164 0h17M396 198h22M475 217h15"/></g><path d="M78 285h78m292 0h78" stroke="currentColor" opacity=".45" strokeWidth="2"/></svg></div>;
}
export function Faq({ items, showcase = false }: { items: [string, string][]; showcase?: boolean }) {
  return <section className="faq" aria-label={showcase ? "Questions et réponses" : undefined}>
    {!showcase && <h2>Questions fréquentes</h2>}
    {items.map(([question, answer], index) => <details key={question} name={showcase ? "alf-general-faq" : undefined} open={showcase && index === 0}>
      <summary>{question}{showcase && <span className="faq-chevron"><ChevronDown aria-hidden="true"/></span>}</summary>
      <p>{answer}</p>
    </details>)}
  </section>;
}
export function FaqShowcase({ items }: { items: [string, string][] }) {
  return <section className="faq-showcase" aria-labelledby="faq-showcase-title"><div className="wrap section faq-showcase-inner">
    <div className="faq-showcase-intro">
      <p className="eyebrow">Questions fréquentes</p>
      <h2 id="faq-showcase-title">Vos questions sur le dépannage et le remorquage</h2>
      <p>Un doute sur votre situation ou sur le transport de votre véhicule ? Expliquez-nous votre besoin pour connaître les options.</p>
      <a className="button primary" href="/contact/">Contacter ALF</a>
    </div>
    <Faq items={items} showcase/>
  </div></section>;
}
export function Related({ slugs }: { slugs: string[] }) {
  return <ul className="linked">{slugs.map(slug => { const page = pages.find(p => p.slug === slug)!; return <li key={slug}><a href={link(slug)}>{page.label}</a></li>; })}</ul>;
}
export function Directory() {
  return <div className="directory">{groups.map(group => <section key={group}><h2>{group}</h2><Related slugs={services.filter(p => p.group === group).map(p => p.slug)}/></section>)}</div>;
}
