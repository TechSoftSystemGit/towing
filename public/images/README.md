# ALF image slots

The `services/` directory contains locally optimized stock photography for the 17 service pages. Photo sources and license links are in `lib/service-photos.ts` and displayed next to the photos. Stock photos illustrate the services and are separate from the client asset slots below.

Use the filenames below for the supplied photos. A responsive illustration fills each empty slot. Rebuild after adding or replacing assets. Review the French alternative text in `lib/content.ts` against the actual subject and crop.

- `logo-alf.webp` replaces the provisional `logo-alf-crest.webp` when the official logo is supplied
- `hero-depannage-creteil.webp` replaces the temporary generated `hero-cab-over-preview.webp` when supplied
- `remorquage-voiture.webp` replaces the homepage fallback `services/voiture-plateau.webp` ([Ali Ananta, Unsplash](https://unsplash.com/photos/iJGax56o5yU))
- `depannage-moto.webp`
- `remorquage-moto.webp`
- `depannage-utilitaire.webp`
- `remorquage-utilitaire.webp`
- `remorquage-poids-lourd.webp`
- `batterie-depannage.webp`
- `pneu-crevaison.webp` replaces the homepage's temporary `assistance-pneu-preview.webp`
- `erreur-carburant.webp`
- `transport-engins-chantier.webp`
- `transport-longue-distance.webp`
- `flotte-alf.webp`, `vehicule-alf.webp` for the homepage fleet section

Export WebP at about 1200 pixels wide for hero and service photos. Check that the subject stays visible at desktop and mobile crops. Derivative image sizes and AVIF/WebP negotiation are handled by Next.js when the Node server is running.
