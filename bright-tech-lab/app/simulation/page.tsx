"use client";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "../../components/button";

export default function Simulation() {
    return (
    <main className={styles.main}>
        <div className={styles.titleDiv}>
        <h1>BrightLab</h1>
        <div className={styles.subtitleDiv}>
            <h2>Développement et déploiment</h2>
        </div>
        <Image priority src={logo} alt={"logo"} className={styles.mainLogo} />
        
        </div>
    </main>
    );
}
