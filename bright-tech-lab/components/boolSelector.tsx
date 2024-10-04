import styles from "./boolSelector.module.css"


export default function BoolSelector({
    bool,
    setBool,
    label
}: {
    bool: boolean;
    setBool: (value: boolean) => void;
    label: string;
}): JSX.Element {

    function handleClick(): void {
        setBool(!bool);
    }

    const fillboxClass = bool ? styles.fillboxActive : styles.fillbox;

    return (
        <div className={styles.container}>
            <div className={styles.borderbox}>
                <div className={fillboxClass} onClick={handleClick}>

                </div>
            </div>
            <p>{label}</p>
        </div>
    )
}