import { ServiceModule, ServiceTypeModule } from "@/app/core/entity/module.entity";
import styles from "./serviceCategoryModule.module.css";
import downArrow from "@/asset/down_arrow.svg";
import Image from "next/image";
import moins from "@/asset/moins.svg";
import BoolSelector from "@/components/boolSelector";
import { useState } from "react";
import { estimatePrice } from "@/app/core/entity/estimatePrice";

export default function ServiceCategoryModule({
    module,
    onDeleteModule,
    onBoolChange,
    onEnumChange
}: {
    module: ServiceModule;
    onDeleteModule: (id: string) => void;
    onBoolChange: (moduleId: string, property: keyof ServiceModule, value: boolean) => void;
    onEnumChange: (moduleId: string, value: ServiceTypeModule) => void;
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleServiceTypeChange = (newType: ServiceTypeModule) => {
        onEnumChange(module.id, newType);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.borderbox} key={module.id}>
            <div className={styles.fillbox}>
                <div className={styles.header}>
                    <div
                        className={styles.headerContent}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <h1>{module.serviceType || "Sélectionner le type de service"}</h1>
                        <Image src={downArrow} alt="downArrow" className={styles.downArrow} />
                    </div>
                    <Image src={moins} alt="moins" className={styles.moins} onClick={() => onDeleteModule(module.id)} />
                </div>
                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        {Object.values(ServiceTypeModule).map((type) => (
                            <div
                                key={type}
                                className={styles.dropdownItem}
                                onClick={() => handleServiceTypeChange(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.separator} />
                <div className={styles.price}>
                    Prix estimé : {estimatePrice(module) } €
                </div>
            </div>
        </div>
    );
}