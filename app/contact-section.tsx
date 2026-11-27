import Image from "next/image";
import { business } from "../lib/business";
import { clientPhotos } from "../lib/client-photos";
import ContactForm from "./contact-form";

export default function ContactSection() {
  const photo = clientPhotos.roadside;

  return <section className="contact-section" aria-labelledby="contact-section-title">
    <div className="contact-section-heading">
      <p className="eyebrow">Contactez-nous</p>
      <h2 id="contact-section-title">Assistance et remorquage 24h/24</h2>
    </div>
    <div className="contact-section-grid">
      <ContactForm email={business.email} whatsapp={business.whatsapp} telephone={business.tel}/>
      <figure className="contact-section-photo">
        <div className="contact-section-image">
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 48vw"/>
        </div>
      </figure>
    </div>
  </section>;
}
