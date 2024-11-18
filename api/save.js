import { passwords } from './store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password, expiry } = req.body;
        const id = uuidv4();
        passwords[id] = { password, expiry };
        return res.json({ link: `https://${req.headers.host}/api/get?id=${id}` });
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
