import {Collection, Db, Document} from "mongodb";
import {ID} from "../../core/models/CoreModels";
import {ResourceNotFoundError} from "../../core/models/Errors";

export default class MongoDBRepo<T> {
    private readonly db: Db;
    private readonly collection: Collection;

    constructor(mongoDb: Db, collectionName: string) {
        this.db = mongoDb;
        this.collection = this.db.collection(collectionName);
    }

    async insert(document: T) {
        return this.collection.insertOne(document);
    }

    async replace(document: T) {
        // @ts-ignore
        return this.collection.replaceOne({"_id": document["_id"]}, document);
    }

    async find(filter: Record<string, unknown> = {}) {
        const documents: T[] = [];

        const findCursor = this.collection.find(filter);

        while (await findCursor.hasNext()) {
            const document = await findCursor.next();
            // @ts-ignore
            documents.push(document);
        }

        return documents;
    }

    async findById(id: ID): Promise<T> {
        const doc = await this.collection.findOne({ _id: id.valueOf() });

        if (!doc) {
            throw new ResourceNotFoundError(`Resource with id ${id.valueOf()} was not found`);
        }

        return doc as T;
    }
}
