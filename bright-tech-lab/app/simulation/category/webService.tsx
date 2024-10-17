import { useState } from "react";
import EmptyModule from "../serviceModule/emptyModule";
import { BackendWebServiceModule, FrontendWebServiceModule, Module, WebServiceEntity, WebServiceTypeModule  } from "@/app/core/entity/module.entity";
import styles from "./service.module.css";
import WebServiceModule from "../serviceModule/webServiceModule/webServiceModule";


interface WebServiceProps {
    modules: WebServiceEntity[];
    onAddModule: () => void;
    onDeleteModule: (id: string) => void;
    onUpdateModule: (updatedModule: WebServiceEntity) => void; // Nouvelle prop
    isSelected: boolean;    
}

export default function WebService({ modules, onAddModule, onDeleteModule, onUpdateModule, isSelected }: WebServiceProps){

    const handleBoolChange = (moduleId: string, property: keyof WebServiceEntity | keyof FrontendWebServiceModule, value: boolean) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate) {
            const updatedModule = {
                ...moduleToUpdate,
                [property]: value
            } as WebServiceEntity;
            onUpdateModule(updatedModule);
        }
    };
    const handleEnumChange = (moduleId: string, property: keyof BackendWebServiceModule, value: WebServiceTypeModule) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate && moduleToUpdate.webServiceType === WebServiceTypeModule.BACKEND) {
            const updatedModule = {
                ...moduleToUpdate,
                [property]: value
            } as WebServiceEntity;
            onUpdateModule(updatedModule);
        }
    };
    
    return (
        <div className={styles.container}>
            {modules.map((module: WebServiceEntity) => (
                    <WebServiceModule 
                        key={module.id} 
                        module={module} 
                        onDeleteModule={onDeleteModule}
                        onBoolChange={handleBoolChange}
                        onEnumChange={handleEnumChange}
                        isSelected={isSelected}
                    />
            ))}
            <EmptyModule handleClick={onAddModule} />
        </div>
    )
}

