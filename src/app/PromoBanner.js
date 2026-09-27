import { promo } from "../data/promo";

// Composant autonome (styles inline) : n'ajoute aucune classe/ligne à globals.css.
export default function PromoBanner() {
  if (!promo.enabled) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "10px 16px",
        fontSize: 15,
        color: "#000",
        background: "var(--gradient)",
      }}
    >
      {promo.items.join("   •   ")}
    </div>
  );
}
