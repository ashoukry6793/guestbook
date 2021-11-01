import {AuthTokenManager} from "../../core/models/CoreModels";
// @ts-ignore
import express, {Express, Router} from "express";
import MongoDBConnection from "../mongodb/MongoDBConnection";
import AuthTokenManagerImpl from "../AuthTokenManagerImpl";
// @ts-ignore
import cors from "cors";
import routes from "./routes";
import {Db} from "mongodb";
import {BaseApiHandler} from "./base/BaseAPIHandler";
require('dotenv').config();

export class Server {
    authTokenManager: AuthTokenManager;
    router: Router;
    app: Express;
    port: number;
    mongodb: MongoDBConnection;

    constructor() {
        this.authTokenManager = new AuthTokenManagerImpl(String(process.env.JWT_SECRET), String(process.env.JWT_LIFETIME));
        this.router = Router();
        this.app = express();
        this.port = Number(process.env.PORT) || 5000
        this.mongodb = new MongoDBConnection(String(process.env.MONGO_DB));
    }

    async start() {
        try {
            this.setupMiddlewares();
            await this.setupDBConnection();
            this.registerRoutes();
            this.app.listen(this.port, () => console.log(`Server is listening on port ${this.port}...`))
        } catch (err) {
            await this.mongodb.close();
            console.log(err);
        }
    }

    private setupMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private async setupDBConnection() {
        await this.mongodb.connect();
    }

    private get ctx() {
        if (!this.mongodb.db) {
            throw new Error('mongo db is not defined, make sure to connect before registering routes');
        }

        return new ServerCtx(this.authTokenManager, this.mongodb.db);
    }

    private registerRoutes() {
        routes.forEach(route => {
            switch (route.method) {
                case "get":
                    this.app.get(route.path, route.handler.setCtx(this.ctx).handle());
                    break;
                case "post":
                    this.app.post(route.path, route.handler.setCtx(this.ctx).handle());
                    break;
                case "put":
                    this.app.put(route.path, route.handler.setCtx(this.ctx).handle());
                    break;
                case "patch":
                    this.app.patch(route.path, route.handler.setCtx(this.ctx).handle());
                    break;
                case "delete":
                    this.app.delete(route.path, route.handler.setCtx(this.ctx).handle());
                    break;
            }
        })
    }
}

export class ServerCtx {
    authTokenManager: AuthTokenManager;
    db: Db;

    constructor(authTokenManager: AuthTokenManager, db: Db) {
        this.authTokenManager = authTokenManager;
        this.db = db;
    }
}

export interface Route {
    path: string;
    method: string & ('post' | 'get' | 'put' | 'patch' | 'delete');
    handler: BaseApiHandler<any, any>;
}
