import { categories, offers } from "../data/services";
import { promo } from "../data/promo";
import Link from "next/link";
import { Header, Footer, OfferCard, categoryIcons } from "./ui";
import Background from "./background";

export default function Home() {
  return (
    <div className="page">
      <Background />
      <Header />

      <section className="hero container">
        <div className="bloom" aria-hidden="true" />
        <h1>Du site vitrine<br /><span className="gradient-text">au cluster Kubernetes.</span></h1>
        <p>
          Ingénieur en développement web, logiciel et système. Je conçois, développe et héberge
          vos projets, de la première page jusqu'à l'infrastructure qui les fait tourner.
        </p>
        {promo.enabled && (
          <p style={{ color: "var(--main-blue)", fontSize: "0.9em" }}>{promo.hosting}</p>
        )}
        <nav className="category-nav" aria-label="Catégories de services">
          {categories.map((c) => {
            const Icon = categoryIcons[c.id];
            return (
              <a key={c.id} href={`#${c.id}`} className="btn btn-small">
                <Icon aria-hidden="true" /> {c.title}
              </a>
            );
          })}
        </nav>
      </section>

      {categories.map((c) => {
        const Icon = categoryIcons[c.id];
        return (
          <div key={c.id}>
            <div className="section-divider" />
            <section id={c.id} className="category">
              <div className="bloom" aria-hidden="true" />
              <div className="container">
                <div className="category-head">
                  <h2><Icon aria-hidden="true" /> {c.title}</h2>
                  <p>{c.intro}</p>
                </div>
                <div className="grid">
                  {offers.filter((o) => o.category === c.id).map((o, i) => (
                    <OfferCard key={o.slug} offer={o} index={i} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <div className="section-divider" />
      <section className="contact container">
        <div className="bloom" aria-hidden="true" />
        <h2>Un projet <span className="gradient-text">en tête ?</span></h2>
        <p>Décrivez votre besoin en quelques lignes : je vous réponds sous 48 h avec une estimation précise.</p>
        <Link className="btn" href="/contact">Demander un devis</Link>
      </section>

      <Footer />
    </div>
  );
}
