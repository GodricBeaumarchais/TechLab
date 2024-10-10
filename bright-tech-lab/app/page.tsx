"use client";
import styles from "./page.module.css";
import logo from "../asset/logo.svg";
import Image from "next/image";
import Button from "../components/button";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import BurgerMenu from "@/components/burgerMenu";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <BurgerMenu SimulationPriceClick={() => router.push("/simulation")} />
      <div className={styles.titleDiv}>
        <h1>BrightLab</h1>
        <div className={styles.subtitleDiv}>
          <h2>Développement et déploiement</h2>
        </div>
        <Image priority src={logo} alt={"logo"} className={styles.mainLogo} />
        {/* <div className={styles.bouttonContainer}>
          <Link href="https://cv.maximetechlab.fr/" className={styles.noUderline}>
            <Button
              text={"Portfolio"}
              onClick={() => {

              }}
              className={styles.button}
            />
          </Link>
          <Button
            text={"Simulation de prix"}
            onClick={() => router.push("/simulation")}
            className={styles.button} />

        </div> */}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.pragraphContainer}>
          <h2 className={styles.PresentationTitle}>
            Qu’est ce que BrightLab ?
          </h2>
          <p className={styles.txt}>
            Brightlab est une autoEntreprise de d&eacute;veloppement informatique et
            d&#39;infrastructure syst&egrave;me. Au sein de mon autoEntreprise,
            je privil&eacute;gie le contact et le suivi des projets avec mes
            clients afin de m'assurer que le projet corresponde de A &agrave;
            Z &agrave; votre demande et de rester dans l&#39;efficacit&eacute;.
            De plus, je calcule les prix par rapport au contenu de votre
            projet et non au temps pass&eacute; dessus afin de trouver le prix
            le plus correct pour les deux parties.
          </p>
          <br></br>
        </div>
        <div className={styles.pragraphContainer}>
          <h2 className={styles.PresentationTitle}>
            Quels sont les services poposés ?
          </h2>
          <p className={styles.txt}>
            Je propose divers services tels que la cr&eacute;ation et la
            mise en ligne de sites web ainsi que toute la partie serveur, ainsi
            que divers types de scripts utilitaires dans divers langages, que ce
            soit C, C++, Java, Python, Javascript, etc. Je propose aussi des
            services d&#39;expertise, maintenance, d&eacute;ploiement et
            h&eacute;bergement. Vous pouvez aussi consulter 
            <Link className={styles.txtLink} href="https://cv.maximetechlab.fr">
              mon portfolio 
            </Link>
            pour consulter en détail mes compétences.
          </p>
          <br></br>
        </div>
        <div className={styles.pragraphContainer}>
          <h2 className={styles.PresentationTitle}>
            Comment prendre contacte et créé son projet ?
          </h2>
          <p className={styles.txt}>
            Je propose
            <Link className={styles.txtLink} href={"/simulation"}>un service de simulation</Link>
            afin que vous puissiez estimer le prix de votre projet (il inclut un
            outil d&#39;IA afin de pouvoir vous aider). Vous pouvez ensuite le
            t&eacute;l&eacute;charger afin de prendre contact avec moi via ce
            mail pour obtenir plus de pr&eacute;cisions sur la mise en place de
            votre projet. Vous pouvez t&eacute;l&eacute;charger votre fichier de
            simulation afin d&#39;apporter plus de clart&eacute;, mais ce
            n&#39;est pas obligatoire. &agrave; partir de ce point, je
            pourrai &eacute;tablir une v&eacute;ritable estimation de prix et
            un cahier des charges afin de r&eacute;pondre &agrave; votre
            demande.
          </p>
          <br></br>
        </div>
      </div>
    </main>
  );
}
