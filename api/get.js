import { getPasswords, deletePassword } from './store';

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const passwords = getPasswords();
        const entry = passwords[id];

        if (!entry) {
            return res.status(404).json({ error: 'Ссылка не существует' });
        }

        const currentTime = Date.now();
        if (currentTime > entry.expiry) {
            deletePassword(id);
            return res.status(410).json({ error: 'Срок действия ссылки истёк' });
        }

        return res.json({ encryptedPassword: Buffer.from(entry.password).toString('base64') });
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
