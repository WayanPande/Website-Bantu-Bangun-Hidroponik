import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://wayan:12345@cluster0.irn4k.mongodb.net/hidroponik?retryWrites=true&w=majority');

    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertMany(document);

    return result;
}

export async function getAllDocuments(client, collection) {
    const db = client.db();

    const documents = await db.collection(collection).find().toArray();
    return documents;
}