import React from 'react';
import styles from './Category.module.css';

interface CategoryProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({ text, isSelected, onClick }) => {
    
    return (
        <div 
            className={`${styles.categoryContainer} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <span className={styles.categoryText}>{text}</span>
            <div className={styles.blur}></div>
        </div>
    );
};

export default Category;