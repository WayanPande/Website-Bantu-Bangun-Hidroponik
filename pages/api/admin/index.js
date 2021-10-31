import { connectDatabase, getAllData, getAllDataReverse, getAllDocuments, getLastData, insertDocument, updateProductData } from "../../../helpers/db-util";

async function handler(req, res) {

    let client

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'GET') {

        try {
            const documents = await getAllDataReverse(client, 'order');
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting items failed!' });
        }


    }

    if (req.method === 'PUT') {

        const data = req.body.items

        try {
            const documents = await updateProductData(client, 'product', data);
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Updating item failed!' });
        }
    }

    if (req.method === 'POST') {
        const type = req.body.type

        if (type === 'insert-product') {
            const data = req.body.items
            try {
                const documents = await insertDocument(client, 'product', data);
                res.status(200).json({ message: 'Success' });
            } catch (error) {
                res.status(500).json({ message: 'Adding item failed!' });
            }
        }


        if (type === 'get-last-product') {
            try {
                const documents = await getLastData(client, 'product');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

        if (type === 'get-all-orders') {
            try {
                const documents = await getAllDataReverse(client, 'order');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }
    }


}

export default handler;