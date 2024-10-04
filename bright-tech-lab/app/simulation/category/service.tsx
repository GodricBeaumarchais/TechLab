import { useState } from "react";
import EmptyModule from "../serviceModule/emptyModule";
import { ServiceModule, ServiceTypeModule } from "@/app/core/entity/module.entity";
import styles from "./service.module.css";
import ServiceCategoryModule from "../serviceModule/serviceModule/serviceCategoryModule";

interface ServiceProps {
    modules: ServiceModule[];
    onAddModule: () => void;
    onDeleteModule: (id: string) => void;
    onUpdateModule: (updatedModule: ServiceModule) => void;
}

export default function Service({ modules, onAddModule, onDeleteModule, onUpdateModule }: ServiceProps) {
    const handleBoolChange = (moduleId: string, property: keyof ServiceModule, value: boolean) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate) {
            const updatedModule = {
                ...moduleToUpdate,
                [property]: value
            } as ServiceModule;
            onUpdateModule(updatedModule);
        }
    };

    const handleEnumChange = (moduleId: string, value: ServiceTypeModule) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate) {
            const updatedModule = {
                ...moduleToUpdate,
                serviceType: value
            } as ServiceModule;
            onUpdateModule(updatedModule);
        }
    };

    return (
        <div className={styles.container}>
            {modules.map((module: ServiceModule) => (
                <ServiceCategoryModule 
                    key={module.id} 
                    module={module} 
                    onDeleteModule={onDeleteModule}
                    onBoolChange={handleBoolChange}
                    onEnumChange={handleEnumChange}
                />
            ))}
            <EmptyModule handleClick={onAddModule} />
        </div>
    );
}