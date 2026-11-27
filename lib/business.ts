const international = (number: string) => number.replace(/\D/g, "").replace(/^00/, "").replace(/^0/, "33");
const phone = process.env.BUSINESS_PHONE || "0149803084";
const digits = international(phone);
const whatsapp = international(process.env.BUSINESS_WHATSAPP ?? "+33664384482");
const origin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : "";

export const business = {
  name: "ALF Dépannage & Remorquage",
  city: "Créteil",
  postalCode: "94000",
  department: "Val-de-Marne",
  region: "Île-de-France",
  availability: "24h/24 et 7j/7",
  phone: digits.startsWith("33") && digits.length === 11
    ? ("0" + digits.slice(2)).match(/.{2}/g)!.join(" ")
    : "+" + digits,
  tel: "tel:+" + digits,
  whatsapp: /^[1-9]\d{7,14}$/.test(whatsapp)
    ? "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent("Bonjour ALF Dépannage, j’ai besoin d’une assistance pour mon véhicule.")
    : "",
  email: process.env.BUSINESS_EMAIL || "",
  address: process.env.BUSINESS_ADDRESS || "",
  origin,
  indexable: Boolean(origin && process.env.SITE_INDEXABLE === "true"),
};
