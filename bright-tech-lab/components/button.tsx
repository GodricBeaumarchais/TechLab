"use client";

import React from "react";
import styles from "./button.module.css";
import classNames from "classnames";

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export default function Button({ text, onClick, className }: ButtonProps) {
    return (
    <div className={classNames(styles.container, className)} onClick={onClick}>
        {text}
    </div>
    );
}
