import { DatabaseModule, DatabaseTypeModule } from "@/app/core/entity/module.entity";
import styles from "./databaseServiceModule.module.css";
import downArrow from "@/asset/down_arrow.svg";
import Image from "next/image";
import moins from "@/asset/moins.svg";
import BoolSelector from "@/components/boolSelector";
import { estimatePrice } from "@/app/core/entity/estimatePrice";
import { useState } from "react";

export default function DatabaseServiceModule({
    module,
    onDeleteModule,
    onBoolChange,
    isSelected
}: {
    module: DatabaseModule;
    onDeleteModule: (id: string) => void;
    onBoolChange: (moduleId: string, property: keyof DatabaseModule, value: boolean) => void;
    isSelected: boolean;
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDatabaseTypeChange = (newType: DatabaseTypeModule) => {
        module.databaseType = newType;
        setIsDropdownOpen(false);
        
    };


    return (
        <div className={styles.borderbox} key={module.id}>
            <div className={styles.fillbox}>
                <div className={styles.header}>
                    <div
                        className={styles.headerContent}
                        onClick={() => { if(isSelected) setIsDropdownOpen(!isDropdownOpen) }}
                    >
                        <h1>{module.databaseType || "Sélectionner le type de base de données"}</h1>
                        <Image src={downArrow} alt="downArrow" className={styles.downArrow} />
                    </div>
                    <Image src={moins} alt="moins" className={styles.moins} onClick={() => onDeleteModule(module.id)} />
                </div>
                {isDropdownOpen  && (
                    <div className={styles.dropdown}>
                        {Object.values(DatabaseTypeModule).map((type) => (
                            <div
                                key={type}
                                className={styles.dropdownItem}
                                onClick={() => handleDatabaseTypeChange(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )
                }
                <div className={styles.separator} />
                {
                    module.databaseType !== null && (
                        <>
                            <div className={styles.seccontent}>
                                <BoolSelector bool={module.Design} setBool={(value) => onBoolChange(module.id, 'Design', value)} label="Design" />
                                <BoolSelector bool={module.Create} setBool={(value) => onBoolChange(module.id, 'Create', value)} label="Create" />
                                <BoolSelector bool={module.Update} setBool={(value) => onBoolChange(module.id, 'Update', value)} label="Update" />
                                <BoolSelector bool={module.Deploy} setBool={(value) => onBoolChange(module.id, 'Deploy', value)} label="Deploy" />
                                {/* <BoolSelector bool={module.hosting} setBool={(value) => onBoolChange(module.id, 'hosting', value)} label="Hosting" /> */}
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.price}>
                                Prix estimé : {estimatePrice(module)} €
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}