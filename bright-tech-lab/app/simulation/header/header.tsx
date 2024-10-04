import { useState, useEffect } from 'react';
import styles from './header.module.css';
import completeLogo from '../../../asset/Complete-Logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Category from './category';
//import categories from '../../../data/category.json';
import { TypeModule } from '../../core/entity/module.entity';

export default function Header({ onCategorySelect, categorySelected }: { onCategorySelect: (categoryId: string) => void, categorySelected: string }) {
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
        }, 1500);

        return () => {
            if (titleDiv) {
                titleDiv.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, []);

    

    const handleCategoryClick = (categoryId: string) => {
        onCategorySelect(categoryId);
    };

    return (
        <div className={styles.titleDiv}>
            <Image
                priority
                src={completeLogo}
                alt="logo"
                className={`${styles.logo} ${isAnimationFinished ? styles.logoPointer : ''}`}
                onClick={() => router.push("/")}
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
        </div>
    );
}