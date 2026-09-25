import Link from "next/link";
import { FaGlobe, FaDiscord, FaLinux, FaArrowRight } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { SiKubernetes } from "react-icons/si";
import { formatPrice } from "../data/services";

// Défini dans .env.development / .env.production
const PORTFOLIO_URL = process.env.NEXT_PUBLIC_PORTFOLIO_URL;

export const categoryIcons = {
  web: FaGlobe,
  discord: FaDiscord,
  api: TbApi,
  linux: FaLinux,
  k8s: SiKubernetes,
};

export function Header() {
  return (
    <header className="site-header container">
      <Link href="/" className="brand">BrightLab <span>Services</span></Link>
      <nav className="header-actions">
        <a className="btn btn-small" href={PORTFOLIO_URL}>Portfolio</a>
        <Link className="btn btn-small" href="/contact">Me contacter</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer container">
      Prix indicatifs HT, basés sur le marché freelance français. Chaque projet fait l'objet d'un devis gratuit.
    </footer>
  );
}

export function OfferCard({ offer, index = 0 }) {
  const Icon = categoryIcons[offer.category];
  return (
    <Link href={`/offres/${offer.slug}`} className="glass offer-card" style={{ "--i": index }}>
      <Icon className="offer-card-icon" aria-hidden="true" />
      <h3>{offer.title}</h3>
      <p>{offer.tagline}</p>
      <div className="price">{formatPrice(offer.price)}</div>
      <div className="offer-card-foot">
        <span>{offer.delay}</span>
        <span className="offer-card-more">Détails <FaArrowRight aria-hidden="true" size={12} /></span>
      </div>
    </Link>
  );
}
