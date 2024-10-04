import { ScriptModule, ScriptTypeModule } from "@/app/core/entity/module.entity";
import styles from "./scriptServiceModule.module.css";
import downArrow from "@/asset/down_arrow.svg";
import Image from "next/image";
import moins from "@/asset/moins.svg";
import BoolSelector from "@/components/boolSelector";
import EnumSelector from "@/components/enumSelector";
import { useState } from "react";
import { estimatePrice } from "@/app/core/entity/estimatePrice";

export default function ScriptServiceModule({
    module,
    onDeleteModule,
    onBoolChange
}: {
    module: ScriptModule;
    onDeleteModule: (id: string) => void;
    onBoolChange: (moduleId: string, property: keyof ScriptModule, value: boolean) => void;
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleScriptTypeChange = (newType: ScriptTypeModule) => {
        module.scriptType = newType;
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
                        <h1>{module.scriptType || "Sélectionner le type de script"}</h1>
                        <Image src={downArrow} alt="downArrow" className={styles.downArrow} />
                    </div>
                    <Image src={moins} alt="moins" className={styles.moins} onClick={() => onDeleteModule(module.id)} />
                </div>
                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        {Object.values(ScriptTypeModule).map((type) => (
                            <div
                                key={type}
                                className={styles.dropdownItem}
                                onClick={() => handleScriptTypeChange(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.separator} />
                <div className={styles.content}>
                    <BoolSelector bool={module.interfaceGraphique} setBool={(value) => onBoolChange(module.id, 'interfaceGraphique', value)} label="Interface graphique" />
                    <BoolSelector bool={module.gestionDistance} setBool={(value) => onBoolChange(module.id, 'gestionDistance', value)} label="Gestion à distance" />
                    <BoolSelector bool={module.intelligenceArtificielle} setBool={(value) => onBoolChange(module.id, 'intelligenceArtificielle', value)} label="Intelligence artificielle" />
                </div>
                <div className={styles.price}>
                    Prix estimé : {estimatePrice(module) } €
                </div>
            </div>
        </div>
    );
}