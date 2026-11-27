"use client";

import { useState, type FormEvent } from "react";

type Field = {
  id: string;
  label: string;
  required?: boolean;
} & ({ options: string[] } | { type: "text" | "tel" | "email"; autoComplete?: string; placeholder: string });

const fields: Field[] = [
  { id: "name", label: "Nom complet", type: "text", autoComplete: "name", placeholder: "Votre nom", required: true },
  { id: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", placeholder: "Votre numéro", required: true },
  { id: "location", label: "Adresse ou position actuelle", type: "text", placeholder: "Rue, commune ou repère", required: true },
  { id: "problem", label: "Service ou problème", options: ["Panne", "Remorquage", "Batterie", "Pneu", "Erreur de carburant", "Transport", "Enlèvement d’épave gratuit", "Autre"], required: true },
  { id: "vehicleDetails", label: "Marque, modèle et année", type: "text", placeholder: "Ex. Renault Clio, 2019" },
  { id: "vehicleCondition", label: "État du véhicule", options: ["Roulant", "Non roulant", "Impossible à déterminer"] },
  { id: "vehicle", label: "Type de véhicule", options: ["Voiture", "Moto", "Utilitaire", "Poids lourd", "Engin", "Autre"], required: true },
  { id: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "nom@exemple.fr" },
];
const optionalDetails: Field[] = [
  { id: "registration", label: "Immatriculation", type: "text", placeholder: "Ex. AB-123-CD" },
  { id: "destination", label: "Destination souhaitée", type: "text", placeholder: "Adresse du garage ou lieu de dépôt" },
];

function FormField({ field }: { field: Field }) {
  const { id, label, required } = field;

  return <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}
    {"options" in field
      ? <select id={id} name={id} required={required} defaultValue="" onInvalid={event => event.currentTarget.setCustomValidity("Choisissez une option.")} onChange={event => event.currentTarget.setCustomValidity("")}>
        <option value="" disabled={required}>Sélectionner</option>{field.options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      : <input id={id} name={id} type={field.type} required={required} autoComplete={field.autoComplete || "off"} placeholder={field.placeholder} maxLength={200} onInvalid={event => event.currentTarget.setCustomValidity(event.currentTarget.validity.typeMismatch ? "Saisissez une adresse e-mail valide." : "Renseignez ce champ.")} onInput={event => event.currentTarget.setCustomValidity("")}/>}
  </label>;
}

export default function ContactForm({ email, whatsapp, telephone }: { email: string; whatsapp: string; telephone: string }) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone")).replace(/\D/g, "");
    if (phone.length < 8 || phone.length > 15) {
      setStatus("Saisissez un numéro de téléphone comportant de 8 à 15 chiffres.");
      form.querySelector<HTMLInputElement>("#phone")?.focus();
      return;
    }
    const summaryFields = [...fields, ...optionalDetails, { id: "message", label: "Message" }];
    setSummary(summaryFields.map(({ id, label }) => [label, String(data.get(id) || "").trim()]).filter(([,value]) => value).map(([label,value]) => label + " : " + value).join("\n"));
    setStatus("Votre récapitulatif est prêt.");
  }
  return <div className="contact-form"><h3>Préparer ma demande</h3><p>Pour une intervention urgente, <a href={telephone}>appelez-nous directement</a>. Le formulaire vous aide à rassembler les détails.</p>
    <noscript><p>Activez JavaScript pour préparer un récapitulatif, ou appelez ALF directement.</p></noscript>
    <form method="post" lang="fr" onSubmit={prepare} onChange={() => { setSummary(""); setStatus(""); }}>
      <div className="form-grid">{fields.map(field => <FormField key={field.id} field={field}/>)}</div>
      <label>Message<textarea name="message" placeholder="Décrivez la panne ou la demande" rows={4} maxLength={1000}/></label>
      <details className="form-details"><summary>Immatriculation et destination (facultatif)</summary><div className="form-grid">{optionalDetails.map(field => <FormField key={field.id} field={field}/>)}</div></details>
      <button className="button primary" type="submit">Préparer ma demande</button>
    </form>
    <p role="status">{status}</p>
    {summary && <div className="summary"><h3>Récapitulatif</h3><pre>{summary}</pre><div className="actions">{email && <a className="button secondary" href={"mailto:" + email + "?subject=Demande%20d’assistance%20ALF&body=" + encodeURIComponent(summary)}>Ouvrir ma messagerie</a>}{whatsapp && <a className="button secondary" href={whatsapp.split("?")[0] + "?text=" + encodeURIComponent(summary)}>Ouvrir WhatsApp</a>}<button className="button secondary" onClick={async () => { try { await navigator.clipboard.writeText(summary); setStatus("Récapitulatif copié."); } catch { setStatus("La copie automatique est indisponible. Sélectionnez le texte du récapitulatif pour le copier."); } }}>Copier le récapitulatif</button></div></div>}
  </div>;
}
