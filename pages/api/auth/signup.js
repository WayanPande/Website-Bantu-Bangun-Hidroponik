import { hashPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-util";


async function handler(req, res) {

    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { name, email, password } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 7 || !name || name.trim().length <= 1) {
        res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long' });
        return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: 'User exist already!' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        name: name,
        email: email,
        password: hashedPassword
    });

    res.status(201).json({ message: 'Created user!' });
    client.close();

}

export default handler;