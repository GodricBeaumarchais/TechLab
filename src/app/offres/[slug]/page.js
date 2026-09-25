import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { categories, offers, formatPrice } from "../../../data/services";
import { Header, Footer, OfferCard, categoryIcons } from "../../ui";
import Background from "../../background";

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return {};
  return { title: `${offer.title} — BrightLab Services`, description: offer.tagline };
}

export default async function OfferPage({ params }) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) notFound();

  const category = categories.find((c) => c.id === offer.category);
  const Icon = categoryIcons[offer.category];
  const related = offers.filter((o) => o.category === offer.category && o.slug !== offer.slug);

  return (
    <div className="page">
      <Background />
      <Header />

      <main className="detail container">
        <div className="bloom" aria-hidden="true" />
        <Link href={`/#${category.id}`} className="back">← Toutes les offres {category.title}</Link>

        <div className="detail-head">
          <span className="detail-kicker"><Icon aria-hidden="true" /> {category.title}</span>
          <h1>{offer.title}</h1>
          <p>{offer.tagline}</p>
        </div>

        <div className="detail-layout">
          <div>
            <section className="glass panel">
              <h2>Ce qui est inclus</h2>
              <ul className="includes">
                {offer.includes.map((item) => (
                  <li key={item}><FaCheck aria-hidden="true" size={14} /> {item}</li>
                ))}
              </ul>
            </section>
            <section className="glass panel">
              <h2>Pour qui ?</h2>
              <p style={{ margin: 0 }}>{offer.audience}</p>
            </section>
          </div>

          <aside className="glass panel aside">
            <div className="price-note">Fourchette indicative</div>
            <div className="price">{formatPrice(offer.price)}</div>
            <dl className="facts">
              <div><dt>Délai</dt><dd>{offer.delay}</dd></div>
              <div>
                <dt>Technologies</dt>
                <dd className="chips">{offer.stack.map((s) => <span key={s} className="chip">{s}</span>)}</dd>
              </div>
            </dl>
            <Link className="btn" href={`/contact?offre=${offer.slug}`}>Demander un devis</Link>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="related">
            <h2>Autres offres <span className="gradient-text">{category.title}</span></h2>
            <div className="grid">
              {related.map((o, i) => <OfferCard key={o.slug} offer={o} index={i} />)}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
