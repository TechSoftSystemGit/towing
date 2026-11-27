import type { Metadata } from "next";
import { business } from "./business";
import { type Page } from "./content";

export const homeTitle = "Dépannage et remorquage à Créteil 24h/24";
export const homeDescription = "Appelez ALF 24h/24 et 7j/7 pour dépanner ou remorquer votre voiture, moto, utilitaire ou poids lourd à Créteil et dans le Val-de-Marne.";
export const isLegal = (slug: string) => ["mentions-legales", "politique-confidentialite"].includes(slug);
export function meta(page?: Page): Metadata {
  const title = (page?.title || homeTitle) + " | ALF";
  const description = page?.description || homeDescription;
  const url = business.origin ? business.origin + (page ? "/" + page.slug + "/" : "/") : undefined;
  return { title, description, alternates: url ? { canonical: url } : undefined,
    robots: { index: business.indexable && (!page || !isLegal(page.slug)), follow: business.indexable },
    openGraph: { title, description, url, siteName: business.name, locale: "fr_FR", type: "website" } };
}
export function Schema({ page }: { page?: Page }) {
  if (!business.origin) return null;
  const origin = business.origin + "/";
  const url = page ? origin + page.slug + "/" : origin;
  const organization = origin + "#alf";
  const website = origin + "#site";
  const area = [business.city, business.department, "Paris", business.region];
  const graph: object[] = [
    { "@type": ["Organization", "AutomotiveBusiness"], "@id": organization, name: business.name, url: origin, telephone: business.tel.slice(4), areaServed: area,
      address: { "@type": "PostalAddress", streetAddress: business.address || undefined, addressLocality: business.city, postalCode: business.postalCode, addressCountry: "FR" },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" } },
    { "@type": "WebSite", "@id": website, name: business.name, url: origin, publisher: { "@id": organization }, inLanguage: "fr-FR" },
    { "@type": page?.slug === "a-propos" ? "AboutPage" : page?.slug === "contact" ? "ContactPage" : page?.slug === "faq" ? "FAQPage" : "WebPage",
      "@id": url + "#page", url, name: page?.title || homeTitle, description: page?.description || homeDescription, isPartOf: { "@id": website },
      ...(page?.slug === "faq" && { mainEntity: page.faq?.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }) },
  ];
  if (page) graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: origin }, { "@type": "ListItem", position: 2, name: page.label, item: url }] });
  if (page?.image || page?.slug === "depannage-remorquage") graph.push({ "@type": "Service", name: page.label, description: page.description, url, areaServed: area, provider: { "@id": organization } });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}/>;
}
