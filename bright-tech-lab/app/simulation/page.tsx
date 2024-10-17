"use client";
import { useState, useEffect } from 'react';
import Header from "./header/header";
import styles from "./page.module.css";
import WebService from './category/webService';
import { DatabaseModule, Module, ScriptModule, ServiceModule, TypeModule, WebServiceEntity } from '../core/entity/module.entity'; // Assurez-vous que ce chemin est correct
import ScriptService from './category/scriptService';
import Service from './category/service';
import DatabaseService from './category/databaseService';
import { calculerPrixTotal } from '../core/entity/estimatePrice';
import { useSwipeable } from 'react-swipeable';
import Head from 'next/head';
import InfoScreen from './info/infoScreen';

const categories = Object.values(TypeModule).map(type => (
    type.toLowerCase()
));

export default function Simulation() {
    const [selectedCategory, setSelectedCategory] = useState('webservice');
    const [modules, setModules] = useState<Module[]>([]);

    const [isContentVisible, setIsContentVisible] = useState(false);
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


    useEffect(() => {
        setTimeout(() => {
            setIsContentVisible(true);
        }, 4000); 

    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("onSwipedLeft")
            const currentIndex = categories.indexOf(selectedCategory);
            if (currentIndex < categories.length - 1) {
                setSelectedCategory(categories[currentIndex + 1]);
            }
        },
        onSwipedRight: () => {
            const currentIndex = categories.indexOf(selectedCategory);
            if (currentIndex > 0) {
                setSelectedCategory(categories[currentIndex - 1]);
            }
        },
        trackMouse: true
    });

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, []);


    const calculatePrice = () => {
        return calculerPrixTotal(modules);
    }

    const deleteModule = (moduleId: string) => {
        const updatedModules = modules.filter(module => module.id !== moduleId);
        const currentModuleCategory = modules.filter(module => module.id == moduleId)[0].moduleType.toUpperCase()
        if (currentModuleCategory == selectedCategory.toUpperCase()) {
            setModules(updatedModules as Module[]);
            localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
        }
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const calculateTranslation = () => {
        const index = categories.indexOf(selectedCategory);
        if (windowWidth < 1000) {
            return `${2 - (index * 45)}%`;
        } else {
            return `${12.5 - (index * 25)}%`;
        }
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

    const downloadProjectAsJson = () => {
        const projectData = JSON.stringify(modules, null, 2);
        const blob = new Blob([projectData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
        if (updatedModule.moduleType.toUpperCase() == selectedCategory.toUpperCase()) {
            setModules(updatedModules as Module[]);
            localStorage.setItem('simulationModules', JSON.stringify(updatedModules));
        }
    };

    const webServiceModules = modules.filter((m): m is WebServiceEntity => m.moduleType === TypeModule.WEBSERVICE);

    const scriptModules = modules.filter((m): m is ScriptModule => m.moduleType === TypeModule.SCRIPT);

    const serviceModules = modules.filter((m): m is ServiceModule => m.moduleType === TypeModule.SERVICE);

    const databaseModules = modules.filter((m): m is DatabaseModule => m.moduleType === TypeModule.DATABASE);

    const isSelected = (moduleType: TypeModule) => {
        return moduleType.toUpperCase() == selectedCategory.toUpperCase();
    };

    const [showInfoScreen, setShowInfoScreen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInfoScreen(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={styles.main}>
            <svg width="1em" height="1em">
                    <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#01ECF3" offset="0%" />
                        <stop stopColor="#DA107B" offset="100%" />
                    </linearGradient>
                </svg>
            {showInfoScreen && <InfoScreen />}
            <Header onCategorySelect={handleCategorySelect} categorySelected={selectedCategory} downloadProjectAsJson={downloadProjectAsJson} calculatePrice={calculatePrice} />
            
            <div {...handlers}  className={`${styles.contentWrapper} ${isContentVisible ? styles.contentVisible : ''}`}>
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
                                    isSelected={isSelected(TypeModule.WEBSERVICE)}
                                />
                            )}
                            {category === 'database' &&
                                <DatabaseService
                                    modules={databaseModules}
                                    onAddModule={() => addModule(TypeModule.DATABASE)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                    isSelected={isSelected(TypeModule.DATABASE)}
                                />
                            }
                            {category === 'script' && (
                                <ScriptService
                                    modules={scriptModules}
                                    onAddModule={() => addModule(TypeModule.SCRIPT)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                    isSelected={isSelected(TypeModule.SCRIPT)}
                                />
                            )}
                            {category === 'service' &&
                                <Service
                                    modules={serviceModules}
                                    onAddModule={() => addModule(TypeModule.SERVICE)}
                                    onDeleteModule={deleteModule}
                                    onUpdateModule={updateModule}
                                    isSelected={isSelected(TypeModule.SERVICE)}
                                />
                            }
                        </div>
                    ))}
                </div>
            </div>
            {  (windowWidth < 1000) && 
                <div className={styles.tabIndicator}>
                    {categories.map((category) => (
                        <div key={category} className={`${styles.tab} ${selectedCategory === category ? styles.active : ''}`} />


                        
                    ))}
                </div>
            }
        </main>
    );
}
