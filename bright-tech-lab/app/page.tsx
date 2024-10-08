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
          <h2 className={styles.PresentationTitle}>Ma relation avec le développement</h2>
          <p className={styles.txt}>J ai commencé à coder à l âge de 11 ans et j ai travaillé sur plusieurs projets personnels et universitaires depuis. Mes deux langages de programmation de prédilection sont le C++ et le Javascript/Typescript, que j utilise principalement pour développer des applications et divers services web.</p>
          <br></br>
        </div>
        <div className={styles.pragraphContainer}>
          <h2 className={styles.PresentationTitle}>Ma relation avec le développement</h2>
          <p className={styles.txt}>J ai commencé à coder à l âge de 11 ans et j ai travaillé sur plusieurs projets personnels et universitaires depuis. Mes deux langages de programmation de prédilection sont le C++ et le Javascript/Typescript, que j utilise principalement pour développer des applications et divers services web.</p>
          <br></br>
        </div>
        <div className={styles.pragraphContainer}>
          <h2 className={styles.PresentationTitle}>Ma relation avec le développement</h2>
          <p className={styles.txt}>J ai commencé à coder à l âge de 11 ans et j ai travaillé sur plusieurs projets personnels et universitaires depuis. Mes deux langages de programmation de prédilection sont le C++ et le Javascript/Typescript, que j utilise principalement pour développer des applications et divers services web.</p>
          <br></br>
        </div>
      </div>
    </main>
  );
}
