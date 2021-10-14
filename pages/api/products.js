import { connectDatabase, getAllDocuments, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {

    let client

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }


    if (req.method === 'POST') {
        const products = req.body.items;
        console.log(products)

        try {
            await insertDocument(client, 'product', products)
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed' });
            return;
        }



        res.status(201).json({ message: 'Success' });
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'product');
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting items failed!' });
        }
    }
}

export default handler;