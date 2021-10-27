import { MongoClient } from "mongodb";

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017/hidroponik');

    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}

export async function insertItem(client, collection, document) {
    const db = client.db();
    const email = document.email;
    const data = document.items[0];

    const result = await db.collection(collection).updateOne({ email: email }, { $push: { "items": data } });

    return result;
}

export async function getAllDocuments(client, collection, email) {
    const db = client.db();

    const documents = await db.collection(collection).find({ email: email }).toArray();
    return documents;
}

export async function updateDocument(client, collection, data) {
    const db = client.db();

    const result = await db.collection(collection).updateOne({ email: data.email }, { $set: { "items": data.items } });

    return result;
}

export async function insertNewUser(client, collection, data) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(data)

    return result;
}

export async function deleteItem(client, collection, email, id) {
    const db = client.db();

    const result = await db.collection(collection).updateOne({ email: email }, { $pull: { "items": { id: id } } }, false, true);
    return result;
}

export async function insertNewOrder(client, collection, data) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(data)

    return result;
}

export async function updateProductStok(client, collection, id, amount) {
    const db = client.db();

    const result = await db.collection(collection).updateOne({ id: id }, { $inc: { stok: amount } });

    return result;
}