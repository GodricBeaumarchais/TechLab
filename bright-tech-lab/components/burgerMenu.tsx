import { useState, useEffect } from "react";
import Image from "next/image";
import burgerMenu from "../asset/burgerMenu.svg";
import styles from "./burgerMenu.module.css";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";

export default function BurgerMenu({ SimulationPriceClick }: { SimulationPriceClick: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsClosing(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setIsOpen(false), 300); // Correspond à la durée de l'animation
    };

    return (
        <div className={styles.container}>
            <button className={styles.burgerMenuContainer} onClick={() => setIsOpen(true)}>
                <Image src={burgerMenu} alt="logo" className={styles.burgerMenu} />
            </button>

            {isOpen && (
                <div className={`${styles.menuContainer} ${isClosing ? styles.menuContainerClose : styles.menuContainerOpen}`}>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FaXmark className={styles.closeButtonIcon} />
                    </button>
                    <button onClick={SimulationPriceClick} className={styles.menuButton}>Simulation prix</button>
                    <Link href="https://cv.maximetechlab.fr/" className={styles.noUderline}>
                        <button onClick={handleClose} className={styles.menuButton}>Portfolio</button>
                    </Link>
                </div>
            )}
        </div>
    )
}