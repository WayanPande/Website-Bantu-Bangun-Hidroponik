import { connectDatabase, getAllDocuments } from "../../../helpers/db-util";

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
            const documents = await getAllDocuments(client, 'blog');
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting items failed!' });
        }
    }
}

export default handler;