import { useState } from "react";
import Image from "next/image";
import burgerMenu from "../asset/burgerMenu.svg";
import styles from "./burgerMenu.module.css";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";

export default function BurgerMenu({ SimulationPriceClick }: { SimulationPriceClick: () => void }) {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={styles.container}>
            {
                !isOpen ? (
                    <button className={styles.burgerMenuContainer} onClick={() => setIsOpen(true)}>
                        <Image src={burgerMenu} alt="logo" className={styles.burgerMenu} ></Image>
                    </button>

                ) : (
                    <div className={styles.menuContainer}>
                        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                            <FaXmark className={styles.closeButtonIcon} />
                        </button>
                        <button onClick={SimulationPriceClick} className={styles.menuButton}>Simulation prix</button>

                        <Link href="https://cv.maximetechlab.fr/" className={styles.noUderline}>
                            <button onClick={() => setIsOpen(false)} className={styles.menuButton}>Portfolio</button>
                        </Link>

                    </div>
                )
            }

        </div>
    )
}