import { WebServiceEntity, WebServiceTypeModule, FrontendWebServiceModule, BackendWebServiceModule, WebServiceBackendTypeModule } from "@/app/core/entity/module.entity";
import styles from "./webServiceModule.module.css";
import downArrow from "@/asset/down_arrow.svg";
import Image from "next/image";
import moins from "@/asset/moins.svg";
import BoolSelector from "@/components/boolSelector";
import EnumSelector from "@/components/enumSelector";
import { useState } from "react";
import { estimatePrice } from "@/app/core/entity/estimatePrice";

export default function WebServiceModule({
    module,
    onDeleteModule,
    onBoolChange,
    onEnumChange,
    isSelected
}: {
    module: WebServiceEntity;
    onDeleteModule: (id: string) => void;
    onBoolChange: (moduleId: string, property: keyof WebServiceEntity | keyof FrontendWebServiceModule, value: boolean) => void;
    onEnumChange: (moduleId: string, property: keyof BackendWebServiceModule, value: WebServiceTypeModule) => void;
    isSelected: boolean;
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const frontendOnBoolChange = (property: keyof WebServiceEntity, value: boolean) => {
        onBoolChange(module.id, property, value);
    };

    const renderContent = () => {
        switch (module.webServiceType) {
            case WebServiceTypeModule.FRONTEND:
                return renderFrontendContent(module as FrontendWebServiceModule);
            case WebServiceTypeModule.BACKEND:
                return renderBackendContent(module as BackendWebServiceModule);
            default:
                return null;
        }
    };

    const handleWebServiceTypeChange = (newType: WebServiceTypeModule) => {
        module.webServiceType = newType;
        setIsDropdownOpen(false);
    };


    const renderFrontendContent = (frontendModule: FrontendWebServiceModule) => (
        <>
            <BoolSelector bool={frontendModule.hasDesign} setBool={(value) => onBoolChange(module.id, 'hasDesign', value)} label="Design" />
            <BoolSelector bool={frontendModule.isUnipage} setBool={(value) => onBoolChange(module.id, 'isUnipage', value)} label="Unipage" />
            <BoolSelector bool={frontendModule.isInteractive} setBool={(value) => onBoolChange(module.id, 'isInteractive', value)} label="Interactif" />
            <BoolSelector bool={frontendModule.includesPaymentMethod} setBool={(value) => onBoolChange(module.id, 'includesPaymentMethod', value)} label="Méthode de paiement" />
            <BoolSelector bool={frontendModule.hasPrimaryBackOffice} setBool={(value) => onBoolChange(module.id, 'hasPrimaryBackOffice', value)} label="Back-office primaire" />
            <BoolSelector bool={frontendModule.hasAnimation} setBool={(value) => onBoolChange(module.id, 'hasAnimation', value)} label="Animation" />
        </>
    );

    const renderBackendContent = (backendModule: BackendWebServiceModule) => (
        <EnumSelector
            enumValue={backendModule.backendType}
            setEnum={(value) => onEnumChange(module.id, 'backendType', value as WebServiceTypeModule)}
            enumOptions={Object.values(WebServiceBackendTypeModule)}
        />
    );

    return (
        <div className={styles.borderbox} key={module.id}>
            <div className={styles.fillbox}>
                <div className={styles.header}>
                    <div
                        className={styles.headerContent}
                        onClick={() => { if(isSelected) setIsDropdownOpen(!isDropdownOpen) }}
                    >
                        <h1>{module.webServiceType || "Selectionner le type de service"}</h1>
                        <Image src={downArrow} alt="downArrow" className={styles.downArrow} />
                    </div>
                    <Image src={moins} alt="moins" className={styles.moins} onClick={() => onDeleteModule(module.id)} />
                </div>
                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        {Object.values(WebServiceTypeModule).map((type) => (
                            <div
                                key={type}
                                className={styles.dropdownItem}
                                onClick={() => handleWebServiceTypeChange(type)}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.separator} />
                {
                    module.webServiceType !== null && (
                        <>
                            <div className={styles.content}>
                                {renderContent()}
                            </div>
                            <div className={styles.separator} />
                            <div className={styles.seccontent}>
                                <BoolSelector bool={module.Design} setBool={(value) => onBoolChange(module.id, 'Design', value)} label="Design" />
                                <BoolSelector bool={module.Create} setBool={(value) => onBoolChange(module.id, 'Create', value)} label="Create" />
                                <BoolSelector bool={module.Update} setBool={(value) => onBoolChange(module.id, 'Update', value)} label="Update" />
                                <BoolSelector bool={module.Deploy} setBool={(value) => onBoolChange(module.id, 'Deploy', value)} label="Deploy" />
                                {/* <BoolSelector bool={module.hosting} setBool={(value) => onBoolChange(module.id, 'hosting', value)} label="hosting" /> */}
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