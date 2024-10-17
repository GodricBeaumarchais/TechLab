import { useState, useEffect } from 'react';
import styles from './header.module.css';
import completeLogo from '../../../asset/Complete-Logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Category from './category';
import { FaDownload } from 'react-icons/fa';
//import categories from '../../../data/category.json';
import { TypeModule } from '../../core/entity/module.entity';
import { FaMailBulk } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import Title from '../../../components/title';


export default function Header({ onCategorySelect, categorySelected, downloadProjectAsJson, calculatePrice }: { onCategorySelect: (categoryId: string) => void, categorySelected: string, downloadProjectAsJson: () => void, calculatePrice: () => number }) {
    const router = useRouter();
    const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
    const [areCategoriesVisible, setAreCategoriesVisible] = useState<boolean>(false);

    const categories = Object.values(TypeModule).map(type => ({
        id: type.toLowerCase(),
        text: type
    }));

    useEffect(() => {
        const handleAnimationEnd = () => {
            setIsAnimationFinished(true);
        };

        const titleDiv = document.querySelector(`.${styles.titleDiv}`);
        if (titleDiv) {
            titleDiv.addEventListener('animationend', handleAnimationEnd);
        }

        setTimeout(() => {
            setAreCategoriesVisible(true);
        }, 3500);

        return () => {
            if (titleDiv) {
                titleDiv.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, []);


    const handleMailClick = () => {
        copy("maxime.tancrede.pro@gmail.com"); // Remplacez par votre adresse email réelle
        alert("Email copié !");
    };



    const handleCategoryClick = (categoryId: string) => {
        onCategorySelect(categoryId);
    };

    const [windowWidth, setWindowWidth] = useState(2000);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (windowWidth > 1000) {
        return (
            <div className={styles.titleDiv}>
                

                <Image
                    priority
                    src={completeLogo}
                    alt="logo"
                    className={`${styles.logo} ${isAnimationFinished ? styles.logoPointer : ''}`}
                    onClick={() => { if (isAnimationFinished) router.push("/") }}
                />


                <div className={`${styles.categoriesContainer} ${areCategoriesVisible ? styles.categoriesVisible : ''}`}>
                    {categories.map((category) => (
                        <Category
                            key={category.id}
                            text={category.text}
                            isSelected={categorySelected === category.id}
                            onClick={() => handleCategoryClick(category.id)}
                        />
                    ))}
                </div>
                <div className={`${styles.rightPart} ${areCategoriesVisible ? styles.rightPartVisible : ''}`}>
                    <div className={styles.iconContainer} onClick={downloadProjectAsJson}>
                        <FaDownload style={{ fill: "url(#blue-gradient)" }} />
                    </div>
                    <div className={styles.iconContainer} onClick={handleMailClick}>
                        <FaMailBulk style={{ fill: "url(#blue-gradient)" }} />
                    </div>
                    <div className={styles.PriceDiv} >
                        <p>Prix {calculatePrice()} €</p>
                    </div>


                </div>
                
            </div>
        )
    }
    else {
        return (
            <div className={styles.titleDiv}>
                <div className={`${styles.rightPart} ${areCategoriesVisible ? styles.rightPartVisible : ''}`}>
                    <div className={styles.iconContainer} onClick={downloadProjectAsJson}>
                        <FaDownload style={{ fill: "url(#blue-gradient)" }} />
                    </div>

                    <div className={styles.PriceDiv} >
                        <p>Prix {calculatePrice()} €</p>
                    </div>
                    <div className={styles.iconContainer} onClick={handleMailClick}>
                        <FaMailBulk style={{ fill: "url(#blue-gradient)" }} />
                    </div>
                </div>
                
            </div>
        );
    }
}