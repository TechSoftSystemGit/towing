# ALF Dépannage & Remorquage

French roadside assistance website for Créteil and Val-de-Marne. Built with Next.js App Router, React, TypeScript and server-rendered pages.

## Local setup

```sh
npm install
npm run dev
npm run build
npm start
```

Use Node.js 22 or 24. Copy `.env.example` to `.env.local` to configure local overrides. The production server defaults to port 3000 and accepts the platform's `PORT` environment variable.

## GitHub and Hostinger

Commit the project and lockfile to the intended GitHub repository. In the Hostinger Node.js app, connect that repository and configure the project root, Next.js preset, install command `npm ci`, build command `npm run build`, and start command `npm start`. Set environment variables for the build and runtime. Keep credentials outside Git.

For any preview leave `SITE_INDEXABLE=false`. The preview allows crawlers to read the HTML noindex directives and returns an empty sitemap. Use Hostinger authentication if private access is required. Once the approved production domain and business disclosures are ready, set `SITE_URL` to the HTTPS origin and `SITE_INDEXABLE=true`, then rebuild. Check the HTML canonical, robots, XML sitemap and telephone action using the deployed hostname.

The contact form prepares a summary in the browser. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD` in the build and runtime environment to enable direct email delivery from the form to the SMTP mailbox. Titan uses `smtp.titan.email` on port 465 with TLS or port 587 with STARTTLS. Set `BUSINESS_EMAIL` to display the public contact email and enable the prefilled email link. The WhatsApp and email links open the visitor's own messaging apps.

The language menu loads static French-to-language dictionaries from `public/translations/` and remembers the visitor's selection on this device. Update these dictionaries when visible French copy changes. Form values and the prepared dispatch summary stay as entered and are excluded from translation.

## Page list and keyword map

| Route | Primary query or navigation intent |
| --- | --- |
| `/` | dépannage et remorquage Créteil 24h/24 |
| `/depannage-remorquage/` | services de dépannage et remorquage |
| `/depannage-creteil/` | dépannage auto Créteil |
| `/remorquage-creteil/` | remorquage Créteil |
| `/depannage-val-de-marne-94/` | dépannage 94 Val-de-Marne |
| `/remorquage-val-de-marne-94/` | remorquage 94 Val-de-Marne |
| `/depannage-voiture/` | dépannage voiture |
| `/remorquage-voiture/` | remorquage voiture |
| `/depannage-moto/` | dépannage moto |
| `/remorquage-moto/` | remorquage moto |
| `/depannage-utilitaire/` | dépannage utilitaire |
| `/remorquage-utilitaire/` | remorquage utilitaire |
| `/depannage-poids-lourd/` | dépannage poids lourd |
| `/remorquage-poids-lourd/` | remorquage poids lourd |
| `/depannage-batterie/` | dépannage batterie |
| `/depannage-pneu-creve/` | dépannage pneu crevé |
| `/erreur-carburant/` | erreur de carburant, vidange de réservoir |
| `/transport-engins-chantier/` | transport engins de chantier |
| `/transport-vehicule-longue-distance/` | transport véhicule longue distance |
| `/zones-intervention/` | dépannage et remorquage Paris, Île-de-France et 94 |
| `/a-propos/` | entreprise ALF Créteil |
| `/contact/` | téléphone ALF Dépannage |
| `/faq/` | questions dépannage et remorquage |
| `/blog/` | conseils panne sur la route |
| `/mentions-legales/` | site publisher information |
| `/politique-confidentialite/` | privacy information |

Search-result review identified local emergency, vehicle-specific and symptom-specific results. Search volumes were unavailable. The [Créteil towing result](https://www.alloremorquage.com/remorquage-creteil/), [Créteil vehicle assistance result](https://www.depannageautoparis75.fr/creteil.html) and [Val-de-Marne heavy vehicle result](https://remorquage-94.fr/) informed the query groupings.

The [existing Wix homepage](https://depannagealf.wixsite.com/alf-d) publishes the telephone number, 24/7 availability, Paris and Île-de-France coverage, services for cars, motorcycles, vans and heavy vehicles, and long-distance work by quote. The client brief supplies the Créteil base and specialist service scope. The new copy leaves response times, experience claims, testimonials, exact coverage and equipment limits out pending confirmation.

Service pages use the same server template for breadcrumbs, contact actions, service-area links, FAQs and related services. The body of each page addresses its own situations, what to prepare and what ALF needs to confirm. The service hub links to every service. The homepage links to vehicle, symptom, transport and priority geographic pages. Paris and Île-de-France are covered on the service-area page and in contextual copy.

Page-specific titles, descriptions and Open Graph data are generated from the same content source. Production metadata adds absolute canonicals. The JSON-LD graph includes Organization/AutomotiveBusiness, WebSite and WebPage with Service and BreadcrumbList on relevant routes and the dedicated AboutPage, ContactPage and FAQPage types. The production sitemap lists 24 indexable pages. Legal pages use noindex.

The layout reserves image dimensions and prioritizes the real hero image once installed. Typography uses self-hosted Inter and Barlow Condensed. The hero heading animation respects reduced-motion preferences. The site uses native navigation disclosures and FAQs. Accessibility features include French document language, skip link, visible focus, semantic landmarks, labeled inputs, live form feedback and mobile safe-area padding. Field Core Web Vitals require production traffic.

## Verification

- Dependency installation and production build passed with strict TypeScript checking.
- Generated HTML checks passed for all 26 pages, including one H1 per page, unique metadata, valid internal destinations, normalized telephone actions and parseable JSON-LD.
- A production-configuration build generated 24 sitemap URLs, matching canonicals and a robots sitemap declaration. The default build generated noindex for all 26 pages and an empty sitemap.
- Headless Edge checks covered eight representative pages at 375, 390, 430, 768, 1024, 1280 and 1440 pixels. The tested pages had no horizontal overflow or browser console errors. The mobile menu and contact summary worked. The homepage was visually checked at 375 and 1440 pixels.
- Lighthouse scores, full WCAG conformance, production-domain behavior and performance with final photos remain unverified.
- The project is local. GitHub and Hostinger setup instructions are above. No GitHub repository or Hostinger app was specified.

## Information required from the client

1. Official logo and approved brand colors.
2. Edited fleet and service photographs.
3. WhatsApp-enabled number and availability hours.
4. Business email and preferred written request workflow.
5. Exact public address, if applicable.
6. Production domain.
7. Confirmation that 01 49 80 30 84 remains the main telephone number.
8. Battery replacement scope, including whether it merits its own page.
9. Tyre service and replacement scope.
10. Whether oil assistance is roadside service or scheduled maintenance.
11. Confirmed wrong-fuel draining capabilities.
12. Heavy-duty recovery equipment, tonnage, dimensions and trailer limits.
13. Construction machinery types and weight limits.
14. Long-distance coverage and whether vehicle repatriation is a distinct service.
15. Legal company and hosting disclosures and approved privacy language.
16. Traceable reviews approved for display.
17. Accepted payment methods.
18. Pricing policy for the site.
19. Service-by-service 24/7 availability.

Add separate battery replacement, oil assistance or repatriation routes once their scope is confirmed.
