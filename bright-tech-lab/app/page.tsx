"use client";
import styles from "./page.module.css";
import logo from "../asset/logo.svg";
import Image from "next/image";
import Button from "../components/button";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  
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
            onClick={() => router.push("/simulation") }
            className={styles.button}/>
        </div>
      </div>
    </main>
  );
}
