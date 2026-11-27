import { editorialPhotoSources } from "./editorial-photo-sources";

export type ServiceStockPhoto = {
  file: string;
  alt: string;
  sourceUrl: string;
  provider: "Pexels" | "Unsplash";
};

function pexels(file: string, alt: string, source: string): ServiceStockPhoto {
  return { file, alt, sourceUrl: "https://www.pexels.com/photo/" + source + "/", provider: "Pexels" };
}

function unsplash(file: string, alt: string, id: string): ServiceStockPhoto {
  return { file, alt, sourceUrl: "https://unsplash.com/photos/" + id, provider: "Unsplash" };
}

function editorial(id: keyof typeof editorialPhotoSources) {
  const [source, alt] = editorialPhotoSources[id];
  return pexels("stock-" + id, alt, source);
}

export const servicePhotoLicenses = {
  Pexels: "https://www.pexels.com/license/",
  Unsplash: "https://unsplash.com/license",
};

const urban = pexels("depanneuse-urbaine", "Dépanneuse orange à plateau dans une rue", "a-yellow-flat-bed-truck-on-a-street-near-a-pedestrian-lane-11383127");
const pickup = pexels("voiture-sur-depanneuse", "Pick-up chargé sur un plateau incliné", "a-car-on-a-tow-truck-17429097");
const recovery = pexels("depanneuse-et-voiture", "Voiture chargée sur une dépanneuse", "a-tow-truck-with-car-10061763");
const breakdown = pexels("depannage-capot", "Deux personnes regardent sous le capot d’une voiture", "cheerful-ethnic-man-repairing-broken-car-with-friend-5835349");
const underHood = pexels("mecanicien-capot", "Mécanicien penché sous un capot ouvert", "mechanic-bending-under-car-hood-20550054");
const flatbed = unsplash("voiture-plateau", "Voiture transportée sur un camion à plateau", "iJGax56o5yU");
const motorbike = pexels("moto-depannage", "Mécanicien travaillant sur une moto en extérieur", "street-mechanic-fixing-a-motorcycle-outdoors-38221122");
const motorcycleTrailer = pexels("moto-remorque", "Motos chargées sur une remorque attelée à une voiture", "car-towing-trailer-with-motorbikes-5199685");
const workshopMoto = pexels("moto-mecanicien", "Mécanicien intervenant sur une moto", "a-mechanic-fixing-a-motorbike-11890950");
const van = pexels("utilitaire-route", "Fourgon utilitaire blanc stationné en bord de rue", "white-delivery-van-parked-on-roadside-11040957");
const lightRecovery = unsplash("utilitaire-remorquage", "Dépanneuse verte et blanche portant un véhicule sur son plateau", "ZjiJxBqFDEI");
const truckRepair = pexels("camion-depannage", "Intervention sur un camion équipé d’un bras de manutention", "industrial-truck-repair-with-worker-outdoors-35580957");
const truckOnPlatform = unsplash("camion-remorquage", "Camion blanc transporté sur un plateau", "arbzQ-DuP3Y");
const truckRecovery = unsplash("camion-recuperation", "Véhicules de dépannage autour d’un semi-remorque immobilisé", "fX8KjTPf8cA");
const battery = pexels("batterie-cables", "Câbles de démarrage raccordés à une batterie automobile", "car-battery-with-jumper-cables-attached-32282232");
const clamps = pexels("batterie-pinces", "Pinces de démarrage raccordées sous un capot", "close-up-of-charging-car-with-clamps-5572260");
const tyre = pexels("roue-remplacement", "Intervention sur la roue d’une voiture soulevée", "mechanic-changing-car-wheel-17600886");
const spare = pexels("roue-secours", "Remplacement de la roue d’une voiture noire", "man-changing-tire-of-a-black-sports-car-16682794");
const nozzle = pexels("carburant-pistolet", "Pistolet de carburant inséré dans l’orifice d’un réservoir", "gas-pump-nozzle-in-the-cars-filler-neck-21811094");
const fuelStation = pexels("carburant-station", "Ravitaillement d’une voiture en station-service", "close-up-of-a-person-refueling-the-car-at-a-gas-station-20500733");
const excavatorOnTrailer = unsplash("engin-plateau", "Pelle de chantier chargée sur une remorque à plateau", "8f8OYBy3z4U");
const excavator = unsplash("engin-remorque", "Pelle mécanique sur chenilles sur un chantier", "NqtOodoJIx8");
const carCarrier = pexels("porte-voitures", "Camion porte-voitures chargé de plusieurs véhicules", "car-transport-truck-on-road-in-heathwood-34539243");

export const servicePhotos: Partial<Record<string, { hero: ServiceStockPhoto; detail: ServiceStockPhoto }>> = {
  "depannage-creteil": { hero: urban, detail: editorial(20041491) },
  "remorquage-creteil": { hero: pickup, detail: editorial(13060987) },
  "depannage-val-de-marne-94": { hero: breakdown, detail: editorial(6140995) },
  "remorquage-val-de-marne-94": { hero: recovery, detail: editorial(13151224) },
  "depannage-voiture": { hero: underHood, detail: editorial(4315572) },
  "remorquage-voiture": { hero: flatbed, detail: editorial(8931963) },
  "depannage-moto": { hero: motorbike, detail: workshopMoto },
  "remorquage-moto": { hero: motorcycleTrailer, detail: editorial(5023574) },
  "depannage-utilitaire": { hero: van, detail: editorial(32976307) },
  "remorquage-utilitaire": { hero: lightRecovery, detail: editorial(27959932) },
  "depannage-poids-lourd": { hero: truckRepair, detail: editorial(34261459) },
  "remorquage-poids-lourd": { hero: truckOnPlatform, detail: truckRecovery },
  "depannage-batterie": { hero: battery, detail: clamps },
  "depannage-pneu-creve": { hero: tyre, detail: spare },
  "erreur-carburant": { hero: nozzle, detail: fuelStation },
  "transport-engins-chantier": { hero: excavatorOnTrailer, detail: excavator },
  "transport-vehicule-longue-distance": { hero: carCarrier, detail: editorial(32212376) },
};

export const informationHeroPhotos: Record<string, ServiceStockPhoto> = {
  "depannage-remorquage": editorial(11686531),
  "zones-intervention": editorial(7443699),
  "a-propos": editorial(6720541),
  contact: editorial(4173086),
  faq: editorial(9626877),
  blog: editorial(8985456),
  "mentions-legales": editorial(4388221),
  "politique-confidentialite": editorial(8985721),
  "not-found": editorial(3289479),
};

export function servicePhotoSrc(photo: ServiceStockPhoto) {
  return "/images/services/" + photo.file + ".webp";
}

