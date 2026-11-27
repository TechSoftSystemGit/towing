export const clientPhotos = {
  roadside: { src: "/images/client/resized/service-remorquage.webp", alt: "Technicien près d’une berline blanche sur une dépanneuse jaune" },
  fleet: { src: "/images/client/resized/depanneuses-mercedes.webp", alt: "Dépanneuses Mercedes jaune et blanche stationnées côte à côte" },
  car: { src: "/images/client/resized/berline-sur-plateau.webp", alt: "Berline blanche sur le plateau d’une dépanneuse jaune" },
  street: { src: "/images/client/resized/depannage-en-ville.webp", alt: "BMW blanche remorquée dans une rue résidentielle" },
  motorcycle: { src: "/images/client/resized/moto-sur-plateau.webp", alt: "Moto noire arrimée sur un camion à plateau" },
  truck: { src: "/images/client/resized/camion-frigorifique.webp", alt: "Camion frigorifique chargé sur une dépanneuse jaune" },
  machinery: { src: "/images/client/resized/service-engins-chantier.webp", alt: "Pelle de chantier jaune transportée sur une remorque surbaissée" },
  transporter: { src: "/images/client/resized/porte-voitures-lohr.webp", alt: "Porte-voitures Lohr chargé sur une route bordée d’arbres" },
  battery: { src: "/images/client/resized/service-batterie.webp", alt: "Technicien manipulant une batterie sous le capot d’une voiture" },
  tyre: { src: "/images/client/resized/service-pneu.webp", alt: "Technicien remplaçant une roue de voiture" },
  fuel: { src: "/images/client/resized/service-erreur-carburant.webp", alt: "Technicien versant de l’huile moteur sous le capot d’une voiture" },
};

const detailPhotos: Partial<Record<string, keyof typeof clientPhotos>> = {
  home: "car",
  "depannage-creteil": "street",
  "remorquage-creteil": "roadside",
  "remorquage-val-de-marne-94": "car",
  "depannage-voiture": "battery",
  "remorquage-voiture": "street",
  "depannage-moto": "motorcycle",
  "remorquage-moto": "motorcycle",
  "remorquage-utilitaire": "truck",
  "depannage-poids-lourd": "truck",
  "remorquage-poids-lourd": "truck",
  "depannage-batterie": "battery",
  "depannage-pneu-creve": "tyre",
  "erreur-carburant": "fuel",
  "transport-engins-chantier": "machinery",
  "transport-vehicule-longue-distance": "transporter",
};

export function clientDetailPhoto(slug: string) {
  return clientPhotos[detailPhotos[slug] ?? "fleet"];
}
