"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaCheck } from "react-icons/fa";
import { categories, offers } from "../../data/services";

const BUDGETS = ["Moins de 1 000 €", "1 000 – 3 000 €", "3 000 – 7 000 €", "7 000 – 15 000 €", "Plus de 15 000 €", "Je ne sais pas encore"];
const DEADLINES = ["Dès que possible", "Sous 1 mois", "1 à 3 mois", "Plus de 3 mois", "Pas de contrainte"];

// Même service / template / clé que le CV. Le template attend name, email, message :
// les champs du brief sont donc regroupés dans message pour ne rien changer côté EmailJS.
export default function ContactForm({ defaultOffer = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const offer = offers.find((o) => o.slug === data.offer);
    const message = [
      `Offre : ${offer ? offer.title : "Autre / à définir"}`,
      `Entreprise : ${data.company || "—"}`,
      `Budget : ${data.budget}`,
      `Délai : ${data.deadline}`,
      "",
      data.description,
    ].join("\n");

    setStatus("sending");
    try {
      await emailjs.send("service_vp9kva4", "template_05zy9yu", { name: data.name, email: data.email, message }, { publicKey: "5lKPKuq7M-RF4mAqX" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass panel send-success" role="status">
        <span className="send-success-badge"><FaCheck /></span>
        <h2>Demande envoyée !</h2>
        <p>Merci, je reviens vers vous sous 48 h avec une première estimation.</p>
      </div>
    );
  }

  return (
    <form className="glass panel contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="field">
          <span>Nom *</span>
          <input name="name" required minLength={2} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <label className="field">
        <span>Entreprise / structure</span>
        <input name="company" autoComplete="organization" />
      </label>

      <label className="field">
        <span>Type de projet *</span>
        <select name="offer" defaultValue={defaultOffer} required>
          <option value="" disabled>Choisir une offre</option>
          {categories.map((c) => (
            <optgroup key={c.id} label={c.title}>
              {offers.filter((o) => o.category === c.id).map((o) => (
                <option key={o.slug} value={o.slug}>{o.title}</option>
              ))}
            </optgroup>
          ))}
          <option value="autre">Autre / je ne sais pas</option>
        </select>
      </label>

      <div className="form-row">
        <label className="field">
          <span>Budget *</span>
          <select name="budget" defaultValue="" required>
            <option value="" disabled>Choisir</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Délai souhaité *</span>
          <select name="deadline" defaultValue="" required>
            <option value="" disabled>Choisir</option>
            {DEADLINES.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Décrivez votre projet *</span>
        <textarea
          name="description"
          required
          minLength={20}
          rows={7}
          placeholder="Objectif, fonctionnalités attendues, existant (site, serveur, outils), exemples qui vous plaisent…"
        />
      </label>

      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Envoi…" : "Envoyer la demande"}
      </button>
      {status === "error" && (
        <p className="form-error" role="alert">
          L'envoi a échoué. Réessayez ou écrivez-moi directement à maxime.tancrede.pro@gmail.com.
        </p>
      )}
    </form>
  );
}
