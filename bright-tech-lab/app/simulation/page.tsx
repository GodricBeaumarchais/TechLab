"use client";
import { useState, useEffect } from 'react';
import Header from "./header/header";
import styles from "./page.module.css";
import WebService from './category/webService';
import { DatabaseModule, Module, ScriptModule, ServiceModule, TypeModule, WebServiceEntity } from '../core/entity/module.entity'; // Assurez-vous que ce chemin est correct
import ScriptService from './category/scriptService';
import Service from './category/service';
import DatabaseService from './category/databaseService';
const categories = Object.values(TypeModule).map(type => (
    type.toLowerCase()
));

export default function Simulation() {
    const [selectedCategory, setSelectedCategory] = useState('webservice');
    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {
        const savedModules = localStorage.getItem('simulationModules');
        if (savedModules) {
            const parsedModules = JSON.parse(savedModules);
            const reconstructedModules = parsedModules.map((module: any) => {
                switch (module.moduleType) {
                    case TypeModule.WEBSERVICE:
                        return new WebServiceEntity(
                            module.id,
                            module.webServiceType,
                            module.Design,
                            module.Create,
                            module.Update,
                            module.Deploy,
                            module.hosting
                        );
                    case TypeModule.SCRIPT:
                        return new ScriptModule(
                            module.id,
                            module.scriptType,
                            module.interfaceGraphique,
                            module.gestionDistance,
                            module.intelligenceArtificielle
                        );
                    case TypeModule.SERVICE:
                        return new ServiceModule(module.id, module.serviceType);
                    case TypeModule.DATABASE:
                        return new DatabaseModule(
                            module.id,
                            module.databaseType,
                            module.Design,
                            module.Create,
                            module.Update,
                            module.Deploy,
                            module.hosting
                        );
                    default:
                        throw new Error("Type de module non reconnu");
                }
            });
            setModules(reconstructedModules);
        }
    }, []);

    const deleteModule = (moduleId: string) => {
        const updatedModules = modules.filter(module => module.id !== moduleId);
        setModules(updatedModules as Module[]);
        localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const calculateTranslation = () => {
        const index = categories.indexOf(selectedCategory);
        console.log(index)
        const centerOffset = 28.5 - (index * 25) - 12.5;
        return `${centerOffset}%`;
    };

    const addModule = (type: TypeModule) => {
        if (type.toUpperCase() === selectedCategory.toUpperCase()) {
            let newModule: Module;
            const id = `${type}_${Date.now()}`;


            switch (type) {
                case TypeModule.WEBSERVICE:
                    newModule = new WebServiceEntity(id, null);
                    break;
                case TypeModule.SCRIPT:
                    newModule = new ScriptModule(id, null);
                    break;
                case TypeModule.SERVICE:
                    newModule = new ServiceModule(id, null);
                    break;
                case TypeModule.DATABASE:
                    newModule = new DatabaseModule(id, null);
                    break;
                default:
                    throw new Error("Type de module non reconnu");
            }

            const updatedModules = [...modules, newModule];
            setModules(updatedModules);
            localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
        }
    };

    const createModuleInDifferentService = (type: TypeModule, targetService: string) => {
        const newModule = {
            id: `${type}_${Date.now()}`,
            type: type,
            service: targetService,
            // Ajoutez d'autres propriétés nécessaires ici
        };
        const updatedModules = [...modules, newModule];
        setModules(updatedModules as Module[]);
        localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
        setSelectedCategory(targetService);
    };


    const updateModule = (updatedModule: Module) => {
        const updatedModules = modules.map(module =>
            module.id === updatedModule.id ? updatedModule : module
        );
        setModules(updatedModules as Module[]);
        console.log(updatedModules);
        localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
    };

    const webServiceModules = modules.filter((m): m is WebServiceEntity => m.moduleType === TypeModule.WEBSERVICE);

    const scriptModules = modules.filter((m): m is ScriptModule => m.moduleType === TypeModule.SCRIPT);

    const serviceModules = modules.filter((m): m is ServiceModule => m.moduleType === TypeModule.SERVICE);

    const databaseModules = modules.filter((m): m is DatabaseModule => m.moduleType === TypeModule.DATABASE);

    return (
        <main className={styles.main}>
            <Header onCategorySelect={handleCategorySelect} categorySelected={selectedCategory} />
            <h1>Tester le prix de votre projet :</h1>
            <h4>Le prix est spécifique à votre projet, la simulation n&apos;est qu&apos;une estimation veuillez nous contacter pour plus d&apos;informations.</h4>
            <div className={styles.contentWrapper}>
                <div className={styles.contentSlider} style={{
                    transform: `translateX(${calculateTranslation()})`
                }}>
                    {categories.map((category) => (
                        <div
                            key={category}
                            className={`${styles.contentItem} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category === 'webservice' && (
                                <WebService
                                    modules={webServiceModules}
                                    onAddModule={() => addModule(TypeModule.WEBSERVICE)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                />
                            )}
                            {category === 'script' && (
                                <ScriptService
                                    modules={scriptModules}
                                    onAddModule={() => addModule(TypeModule.SCRIPT)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                />
                            )}
                            {category === 'service' &&
                                <Service
                                    modules={serviceModules}
                                    onAddModule={() => addModule(TypeModule.SERVICE)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                />
                            }
                            {category === 'database' &&

                                <DatabaseService
                                    modules={databaseModules}
                                    onAddModule={() => addModule(TypeModule.DATABASE)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

