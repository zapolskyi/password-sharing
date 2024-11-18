import { passwords } from './store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password, expiry } = req.body;

        const id = uuidv4();
        passwords[id] = { password, expiry };

        res.status(200).json({ link: `https://${req.headers.host}/get?id=${id}` });
    } else {
        res.status(405).json({ error: 'Метод не поддерживается.' });
    }
}
