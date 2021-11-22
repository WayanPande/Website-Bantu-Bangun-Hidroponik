import { connectDatabase, getAllDocuments, getDetailItem, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {

    let client

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }


    if (req.method === 'POST') {
        const type = req.body.type;

        if (type === 'get-detail-item') {
            const id = req.body.id;

            try {
                const documents = await getDetailItem(client, 'product', id)
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting data failed' });
                return;
            }
        }
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