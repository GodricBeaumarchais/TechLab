import { offers } from "../../data/services";
import { Header, Footer } from "../ui";
import Background from "../background";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Demander un devis — BrightLab Services",
  description: "Décrivez votre projet et recevez une estimation sous 48 h.",
};

export default async function ContactPage({ searchParams }) {
  const { offre } = await searchParams;
  const defaultOffer = offers.some((o) => o.slug === offre) ? offre : "";

  return (
    <div className="page">
      <Background />
      <Header />
      <main className="detail container contact-page">
        <div className="bloom" aria-hidden="true" />
        <div className="detail-head">
          <h1>Parlons de <span className="gradient-text">votre projet</span></h1>
          <p>Quelques lignes suffisent : je reviens vers vous sous 48 h avec une estimation précise.</p>
        </div>
        <ContactForm defaultOffer={defaultOffer} />
      </main>
      <Footer />
    </div>
  );
}
