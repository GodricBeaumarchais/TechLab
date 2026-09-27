import { promo } from "../data/promo";
import { formatPrice } from "../data/services";

// Remplace {formatPrice(offer.price)} : ajoute le -20% en surcouche quand éligible,
// sinon se comporte exactement comme formatPrice.
export default function PromoPrice({ price }) {
  const eligible = promo.enabled && price.min < promo.discount.maxPrice;
  if (!eligible) return formatPrice(price);

  const factor = 1 - promo.discount.percent / 100;
  const discounted = {
    min: Math.round(price.min * factor),
    max: Math.round(price.max * factor),
    unit: price.unit,
  };

  return (
    <>
      <s style={{ opacity: 0.5, fontSize: "0.55em", marginRight: 8 }}>{formatPrice(price)}</s>
      {formatPrice(discounted)}
      <span
        style={{
          display: "inline-block",
          marginLeft: 8,
          padding: "2px 10px",
          fontSize: "0.4em",
          fontWeight: 700,
          borderRadius: 50,
          verticalAlign: "middle",
          color: "#000",
          background: "var(--gradient)",
        }}
      >
        -{promo.discount.percent}%
      </span>
    </>
  );
}
