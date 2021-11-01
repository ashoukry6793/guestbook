import {Db, MongoClient} from "mongodb";

export default class MongoDBConnection {
    db: Db | undefined;
    private readonly dbName: string;
    private readonly client: MongoClient;

    constructor(connectionString: string) {
        this.client = new MongoClient(connectionString);
        this.dbName = this.extractDBNameFromConnectionString(connectionString);
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
    }

    async close() {
        return this.client.close();
    }

    private extractDBNameFromConnectionString(connectionString: String, defaultName = "DEFAULT_DB") {
        let db = connectionString.replace("mongodb://", "").split("?")[0];

        if (db.includes("/")) {
            const splits = db.split("/");
            db = splits[splits.length - 1];
        } else {
            db = ""
        }

        return db ? db : defaultName;
    }
}
