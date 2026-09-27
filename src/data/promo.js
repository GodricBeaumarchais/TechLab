// Bandeau promo optionnel (surcouche, cf. PromoBanner.js). Pour le retirer :
// enabled: false, ou supprimer la ligne <PromoBanner /> dans layout.js.
export const promo = {
  enabled: true,
  items: [
    "3 mois d'hébergement offerts",
    "-20% sur tous les projets de moins de 2 500 €",
  ],
  hosting: "🎁 En ce moment, 3 mois d'hébergement offerts pour tout nouveau projet.",
  discount: { percent: 20, maxPrice: 2500 },
};
