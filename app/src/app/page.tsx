"use client";
import styles from "./page.module.css";
import logo from "../asset/logo.svg";
import Image from "next/image";
import Button from "../components/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.titleDiv}>
        <h1>BrightLab</h1>
        <div className={styles.subtitleDiv}>
          <h2>Développement et déploiment</h2>
        </div>
        <Image priority src={logo} alt={"logo"} className={styles.mainLogo} />
        <div className={styles.bouttonContainer}>
          <Button
            text={"Portfolio"}
            onClick={() => console.log("Découvrir")}
            className={styles.button}
          />
          <Button
            text={"Simulation de prix"}
            onClick={() => console.log("Contact")}
            className={styles.button}/>
        </div>
      </div>
    </main>
  );
}
