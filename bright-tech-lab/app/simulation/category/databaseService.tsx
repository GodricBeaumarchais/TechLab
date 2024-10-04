import { useState } from "react";
import EmptyModule from "../serviceModule/emptyModule";
import { DatabaseModule } from "@/app/core/entity/module.entity";
import styles from "./service.module.css";
import DatabaseServiceModule from "../serviceModule/databaseModule/databaseServiceModule";

interface DatabaseServiceProps {
    modules: DatabaseModule[];
    onAddModule: () => void;
    onDeleteModule: (id: string) => void;
    onUpdateModule: (updatedModule: DatabaseModule) => void;
}

export default function DatabaseService({ modules, onAddModule, onDeleteModule, onUpdateModule }: DatabaseServiceProps) {
    const handleBoolChange = (moduleId: string, property: keyof DatabaseModule, value: boolean) => {
        const moduleToUpdate = modules.find(m => m.id === moduleId);
        if (moduleToUpdate) {
            const updatedModule = {
                ...moduleToUpdate,
                [property]: value
            } as DatabaseModule;
            onUpdateModule(updatedModule);
        }
    };
    

    return (
        <div className={styles.container}>
            {modules.map((module: DatabaseModule) => (
                <DatabaseServiceModule 
                    key={module.id} 
                    module={module} 
                    onDeleteModule={onDeleteModule}
                    onBoolChange={handleBoolChange}
                />
            ))}
            <EmptyModule handleClick={onAddModule} />
        </div>
    );
}