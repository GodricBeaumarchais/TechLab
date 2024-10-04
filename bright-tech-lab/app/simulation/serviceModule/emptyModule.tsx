import styles from "./emptyModule.module.css";
import voctorplus from "../../../asset/Vectorplus.svg";
import Image from 'next/image';

interface EmptyModuleProps {
    handleClick: () => void;
}

export default function EmptyModule({ handleClick }: EmptyModuleProps) {
    return (
        <div className={styles.borderbox}>
            <div className={styles.fillbox} onClick={handleClick}>
                <Image
                    src={voctorplus}
                    alt="voctorplus"
                    className={styles.image}
                />
            </div>
        </div>
    )
}