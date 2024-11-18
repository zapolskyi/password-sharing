import { getPasswords } from './store';

export default function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    const passwords = getPasswords();
    const passwordData = passwords[id];

    if (!passwordData) {
        return res.status(404).json({ error: 'Ссылка не существует' });
    }

    if (Date.now() > passwordData.expiry) {
        return res.status(410).json({ error: 'Срок действия ссылки истёк' });
    }

    res.status(200).json({ encryptedPassword: Buffer.from(passwordData.password).toString('base64') });
}
