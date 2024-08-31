import { useState, useEffect } from 'react';
import styles from './header.module.css';
import completeLogo from '../../../asset/Complete-Logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {


    const router = useRouter();

    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    useEffect(() => {
        const handleAnimationEnd = () => {
            setIsAnimationFinished(true);
        };

        const titleDiv = document.querySelector(`.${styles.titleDiv}`);
        if (titleDiv) {
            titleDiv.addEventListener('animationend', handleAnimationEnd);
        }

        return () => {
            if (titleDiv) {
                titleDiv.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, []);

    return (
        <div className={`${styles.titleDiv} ${isAnimationFinished ? styles.pointerCursor : ''}`}>
            <Image priority src={completeLogo} alt="logo" className={styles.logo} onClick={ () => router.push("/")} />
        </div>
    );
}
