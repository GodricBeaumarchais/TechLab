export enum TypeModule {
    WEBSERVICE = "Webservice",
    SCRIPT = "Script",
    SERVICE = "Service",
    DATABASE = "Database"
}

export enum WebServiceTypeModule {
    FRONTEND = "Frontend",
    BACKEND = "Backend"
}

export enum WebServiceBackendTypeModule {
    API = "API",
    SSE = "Server-Sent Events ",
    WS = "WebSocket",
    gRPC = "gRPC",
    WEBHOOK = "Webhook"
}

export enum DatabaseTypeModule {
    SQL = "SQL",
    NoSQL = "NoSQL",
    GraphQL = "GraphQL"
}

export enum ScriptTypeModule {
    FILE_MANAGEMENT = "Gestion de fichiers",
    TASK_AUTOMATION = "Automatisation de tâches",
    DEPLOYMENT_SCRIPTING = "Scripting pour déploiement (CI/CD)",
    DATABASE_MANAGEMENT = "Gestion de bases de données",
    DATA_ANALYSIS_PROCESSING = "Analyse et traitement de données",
    WEB_SCRAPING = "Web scraping",
    TESTING_VALIDATION = "Test et validation",
    FILE_FORMAT_CONVERSION = "Conversion de formats de fichiers",
    USER_MANAGEMENT = "Gestion des utilisateurs (sysadmin)",
    NOTIFICATION_ALERT = "Notification ou alerte",
    OTHER = "Autre"
}

export enum ServiceTypeModule {
    MAINTENANCE_SERVICE = "Service de maintenance",
    DEPLOYMENT_SERVICE = "Service de déploiement",
    HOSTING_SERVICE = "Service de hébergement",
}

export abstract class Module {
    constructor(
        public id: string,
        public moduleType: TypeModule
    ) {}
}

export class WebServiceEntity extends Module {
    constructor(
        id: string,
        public webServiceType: WebServiceTypeModule | null = null,
        public Design: boolean = false,
        public Create: boolean = false,
        public Update: boolean = false,
        public Deploy: boolean = false,
        public hosting: boolean = false
    ) {
        super(id, TypeModule.WEBSERVICE);
    }
}

export class ScriptModule extends Module {
    constructor(
        id: string,
        public scriptType: ScriptTypeModule | null = null,
        public interfaceGraphique: boolean = false,
        public gestionDistance: boolean = false,
        public intelligenceArtificielle: boolean = false
    ) {
        super(id, TypeModule.SCRIPT);
    }
}

export class ServiceModule extends Module {
    constructor(
        id: string,
        public serviceType: ServiceTypeModule | null = null
    ) {
        super(id, TypeModule.SERVICE);
    }
}

export class DatabaseModule extends Module {
    constructor(
        id: string,
        public databaseType: DatabaseTypeModule | null = null,
        public Design: boolean = false,
        public Create: boolean = false,
        public Update: boolean = false,
        public Deploy: boolean = false,
        public hosting: boolean = false
    ) {
        super(id, TypeModule.DATABASE);
    }
}

export class BackendWebServiceModule extends WebServiceEntity {
    constructor(
        id: string,
        public backendType: WebServiceBackendTypeModule
    ) {
        super(id, WebServiceTypeModule.BACKEND);
    }
}

export class FrontendWebServiceModule extends WebServiceEntity {
    constructor(
        id: string,
        public hasDesign: boolean = false,
        public isUnipage: boolean = false,
        public isInteractive: boolean = false,
        public includesPaymentMethod: boolean = false,
        public hasPrimaryBackOffice: boolean = false,
        public hasAnimation: boolean = false
    ) {
        super(id, WebServiceTypeModule.FRONTEND);
    }
}