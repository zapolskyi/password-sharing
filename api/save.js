import { savePassword } from './store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password, expiry } = req.body;

        if (!password || !expiry) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const id = uuidv4();
        savePassword(id, { password, expiry });
        return res.status(200).json({ link: `${req.headers.origin}/api/get?id=${id}` });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
