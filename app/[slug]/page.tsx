import { notFound } from "next/navigation";
import { Clock3, MapPin } from "lucide-react";
import { business } from "../../lib/business";
import { pages, services } from "../../lib/content";
import { meta, Schema } from "../../lib/seo";
import ContactSection from "../contact-section";
import PageExtras from "../page-extras";
import PageFrame from "../page-frame";
import PageHero from "../page-hero";
import { Actions, Directory, Faq, FaqShowcase, link, Related } from "../ui";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return pages.map(({ slug }) => ({ slug })); }
async function getPage({ params }: Props) {
  const { slug } = await params;
  return pages.find(page => page.slug === slug) ?? notFound();
}
export async function generateMetadata(props: Props) { return meta(await getPage(props)); }
export default async function Detail(props: Props) {
  const page = await getPage(props);
  const service = services.includes(page);
  return <PageFrame slug={page.slug}>
    <Schema page={page}/>
    <PageHero slug={page.slug} officialName={page.image} officialAlt={page.alt}>
      <nav className="crumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true">/</span><span aria-current="page">{page.label}</span></nav>
      <div className="page-hero-copy">
        <p className="eyebrow">{page.planned ? "TRANSPORT SUR DEVIS" : service || page.slug === "contact" ? <><Clock3 aria-hidden="true"/> Assistance téléphonique {business.availability}</> : page.group}</p>
        <h1>{page.title}</h1><p>{page.description}</p><Actions/>
      </div>
    </PageHero>
    {page.slug === "faq" && page.faq ? <FaqShowcase items={page.faq}/> : <div className="wrap section page-content">
      {page.sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2><p>{content}</p></section>)}
      {page.slug === "contact" && <ContactSection/>}
      {page.slug === "mentions-legales" && <p>{business.address && <>{business.address}<br/></>}Téléphone <a href={business.tel}>{business.phone}</a>.</p>}
      {page.slug === "depannage-remorquage" && <Directory/>}
      {service && <div className="inline-contact"><MapPin aria-hidden="true"/><div><h2>Zone d’intervention</h2><p>Créteil et Val-de-Marne en priorité. Pour Paris ou une autre commune d’Île-de-France, appelez avec votre localisation pour vérifier la prise en charge.</p><a href="/zones-intervention/">Consulter les zones d’intervention</a></div></div>}
      {page.related && <section><h2>{page.slug === "blog" ? "Guides et services" : "À consulter aussi"}</h2><Related slugs={page.related}/></section>}
      {page.faq && <Faq items={page.faq}/>}
      <a className="text-link" href={link(page.slug === "contact" ? "depannage-remorquage" : "contact")}>{page.slug === "contact" ? "Consulter les services" : "Contacter ALF"}</a>
    </div>}
    <PageExtras slug={page.slug}/>
  </PageFrame>;
}
