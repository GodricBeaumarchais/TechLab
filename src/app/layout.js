import "./globals.css";
import PromoBanner from "./PromoBanner";

export const metadata = {
  title: "BrightLab Services",
  description: "Sites web, bots Discord, API, administration Linux et Kubernetes : offres et fourchettes de prix.",
  icons: { icon: "/favicon.ico" },
};

export const viewport = { themeColor: "#001412" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PromoBanner />
        {children}
      </body>
    </html>
  );
}
