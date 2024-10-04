import { useState } from "react";
import EmptyModule from "../serviceModule/emptyModule";
import { ScriptModule, TypeModule } from "@/app/core/entity/module.entity";
import styles from "./service.module.css";
import ScriptServiceModule from "../serviceModule/scriptServiceModule/scriptServiceModule"

interface ScriptServiceProps {
    modules: ScriptModule[];
    onAddModule: () => void;
    onDeleteModule: (id: string) => void;
    onUpdateModule: (updatedModule: ScriptModule) => void;
}

export default function ScriptService({ modules, onAddModule, onDeleteModule, onUpdateModule }: ScriptServiceProps) {
    const handleBoolChange = (moduleId: string, property: keyof ScriptModule, value: boolean) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate) {
            const updatedModule = {
                ...moduleToUpdate,
                [property]: value
            } as ScriptModule;
            onUpdateModule(updatedModule);
        }
    };

    return (
        <div className={styles.container}>
            {modules.map((module: ScriptModule) => (
                <ScriptServiceModule 
                    key={module.id} 
                    module={module} 
                    onDeleteModule={onDeleteModule}
                    onBoolChange={handleBoolChange}
                />
            ))}
            <EmptyModule handleClick={onAddModule} />
        </div>
    )
}