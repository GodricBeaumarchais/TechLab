import {
    Module,
    TypeModule,
    WebServiceEntity,
    ScriptModule,
    ServiceModule,
    DatabaseModule,
    WebServiceTypeModule,
    ScriptTypeModule,
    ServiceTypeModule,
    DatabaseTypeModule,
    WebServiceBackendTypeModule,
    FrontendWebServiceModule,
    BackendWebServiceModule
} from './module.entity';

const basePrices = {
    webService: {
        frontend: 1000,
        backend: 1500,
        hosting: 0
    },
    script: {
        basic: 800,
        advanced: 1500,
        aiFeature: 1000
    },
    database: {
        sql: 1000,
        nosql: 1200,
        graphql: 1500
    },
    service: {
        maintenance: 500,
        deployment: 1000,
        hosting: 0
    }
};

export function estimatePrice(module: Module): number {
    switch (module.moduleType) {
        case TypeModule.WEBSERVICE:
            return estimateWebServicePrice(module as WebServiceEntity);
        case TypeModule.SCRIPT:
            return estimateScriptPrice(module as ScriptModule);
        case TypeModule.SERVICE:
            return estimateServicePrice(module as ServiceModule);
        case TypeModule.DATABASE:
            return estimateDatabasePrice(module as DatabaseModule);
        default:
            return 0;
    }
}

function estimateWebServicePrice(module: WebServiceEntity): number {
    if (module.webServiceType === null) return 0;

    let price = 0;
    if (module.webServiceType === WebServiceTypeModule.FRONTEND) {
        price += basePrices.webService.frontend;
        if (module.Design) price += 500;
        if (module.Create || module.Update) price += 1000;
        if (module.Deploy) price += 800;
        if (module.hosting) price += basePrices.webService.hosting;

        if (module instanceof FrontendWebServiceModule) {
            if (module.isUnipage) price += 700;
            if (module.isInteractive) price += 500;
            if (module.includesPaymentMethod) price += 1200;
            if (module.hasPrimaryBackOffice) price += 1000;
            if (module.hasAnimation) price += 800;
        }
    } else if (module.webServiceType === WebServiceTypeModule.BACKEND) {
        price += basePrices.webService.backend;
        if (module.Create || module.Update) price += 1200;
        if (module.Deploy) price += 1000;
        if (module.hosting) price += basePrices.webService.hosting;

        if (module instanceof BackendWebServiceModule) {
            if (module.backendType === WebServiceBackendTypeModule.API) {
                price += 1000;
            } else if (module.backendType === WebServiceBackendTypeModule.WS) {
                price += 1500;
            }
        }
    }
    return price;
}

function estimateScriptPrice(module: ScriptModule): number {
    if (module.scriptType === null) return 0;

    let price = basePrices.script.basic;
    if (module.intelligenceArtificielle) price += basePrices.script.aiFeature;
    if (module.interfaceGraphique) price += 500;
    if (module.gestionDistance) price += 300;
    return price;
}

function estimateServicePrice(module: ServiceModule): number {
    if (module.serviceType === null) return 0;

    switch (module.serviceType) {
        case ServiceTypeModule.MAINTENANCE_SERVICE:
            return basePrices.service.maintenance;
        case ServiceTypeModule.DEPLOYMENT_SERVICE:
            return basePrices.service.deployment;
        case ServiceTypeModule.HOSTING_SERVICE:
            return basePrices.service.hosting;
        default:
            return 0;
    }
}

function estimateDatabasePrice(module: DatabaseModule): number {
    if (module.databaseType === null) return 0;

    let price = 0;
    switch (module.databaseType) {
        case DatabaseTypeModule.SQL:
            price += basePrices.database.sql;
            break;
        case DatabaseTypeModule.NoSQL:
            price += basePrices.database.nosql;
            break;
        case DatabaseTypeModule.GraphQL:
            price += basePrices.database.graphql;
            break;
        default:
            return 0;
    }
    if (module.Design) price += 600;
    if (module.Create || module.Update) price += 1000;
    if (module.Deploy) price += 800;
    if (module.hosting) price += basePrices.service.hosting;
    return price;


}

export function calculerPrixTotal(modules: Module[]): number {
    return modules.reduce((total, module) => {
        switch (module.moduleType) {
            case TypeModule.WEBSERVICE:
                return total + estimateWebServicePrice(module as WebServiceEntity);
            case TypeModule.SCRIPT:
                return total + estimateScriptPrice(module as ScriptModule);
            case TypeModule.SERVICE:
                return total + estimateServicePrice(module as ServiceModule);
            case TypeModule.DATABASE:
                return total + estimateDatabasePrice(module as DatabaseModule);
            default:
                return total;
        }
    }, 0);
}
