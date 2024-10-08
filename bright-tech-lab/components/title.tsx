"use client";
import styles from "./title.module.css";
import logo from "../asset/logo.svg";
import Image from "next/image";



export default function Title() {
    return (
        <div className={styles.titleDiv}>
            <h1>BrightLab</h1>
            <div className={styles.subtitleDiv}>
                <h2>Développement et déploiement</h2>
            </div>
            <Image priority src={logo} alt={"logo"} className={styles.mainLogo} />

        </div>
    )
}