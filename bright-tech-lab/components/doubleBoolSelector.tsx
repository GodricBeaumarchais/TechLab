import BoolSelector from "./boolSelector";
import styles from "./doubleBoolSelector.module.css"


export default function DoubleBoolSelector({
    bool,
    setBool,
    label1,
    label2
}: {
    bool: boolean;
    setBool: (value: boolean) => void;
    label1: string;
    label2: string;
}): JSX.Element {
    
    const setBool1 = (value: boolean) => {
        if (bool) {
            setBool(false);
        }
    }
    const setBool2 = (value: boolean) => {
        if (!bool) {
            setBool(true);
        }
    }
    return (
        <div className={styles.container}>
            <BoolSelector bool={bool} setBool={setBool1} label={label1} />
            <BoolSelector bool={!bool} setBool={setBool2} label={label2} />
        </div>
    )
}

