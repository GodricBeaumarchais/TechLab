import styles from "./infoScreen.module.css";

import { useEffect, useState } from 'react';

export default function InfoScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <h1>Tester le prix de votre projet :</h1>
            <h4>Le prix est spécifique à votre projet, la simulation n&apos;est qu&apos;une estimation veuillez nous contacter pour plus d&apos;informations.</h4>
        </div>
    );
}