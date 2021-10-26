import { connectDatabase, deleteItem, getAllDocuments, insertDocument, insertItem, insertNewUser, updateDocument } from "../../helpers/db-util";

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

        if (type === 'new-item') {
            const cartItem = req.body.items;

            try {
                await insertItem(client, 'cart', cartItem)
                client.close();
            } catch (error) {
                res.status(500).json({ message: 'Inserting data failed' });
                return;
            }
            res.status(201).json({ message: 'Success' });
        }

        if (type === 'new-user') {
            const cartItem = req.body.items;

            try {
                await insertNewUser(client, 'cart', cartItem)
                client.close();
            } catch (error) {
                res.status(500).json({ message: 'Inserting data failed' });
                return;
            }
            res.status(201).json({ message: 'Success' });
        }

        if (type === 'get-items') {
            const email = req.body.email;
            // console.log(email)

            try {
                const documents = await getAllDocuments(client, 'cart', email);
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }


    }

    if (req.method === 'PUT') {
        const cartItem = req.body.items;

        try {
            await updateDocument(client, 'cart', cartItem)
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Updating data failed' });
            return;
        }



        res.status(201).json({ message: 'Success' });
    }

    if (req.method === 'GET') {

        const email = req.body.email;

        try {
            const documents = await getAllDocuments(client, 'cart', email);
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting items failed!' });
        }
    }

    if (req.method === 'DELETE') {

        const email = req.body.email;
        const id = req.body.id;

        try {
            const documents = await deleteItem(client, 'cart', email, id);
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Removing items failed!' });
        }

    }
}

export default handler;