import styles from "./enumSelector.module.css"
import BoolSelector from "./boolSelector"

export default function EnumSelector({
    enumValue,
    setEnum,
    enumOptions
}: {
    enumValue: string;
    setEnum: (value: string) => void;
    enumOptions: string[];
}): JSX.Element {
    return (
        <div className={styles.container}>
            {enumOptions.map((option) => (
                <BoolSelector
                    key={option}
                    bool={enumValue === option}
                    setBool={() => setEnum(option)}
                    label={option}
                />
            ))}
        </div>
    )
}