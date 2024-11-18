import { passwords } from './store';
import { parse } from 'url';

export default function handler(req, res) {
    const { query } = parse(req.url, true);
    const id = query.id;

    if (!id || !passwords[id]) {
        res.status(404).json({ error: 'Ссылка не существует.' });
        return;
    }

    const entry = passwords[id];
    const currentTime = Date.now();

    if (currentTime > entry.expiry) {
        delete passwords[id]; // Удаляем истёкшую запись
        res.status(410).json({ error: 'Срок действия ссылки истёк.' });
        return;
    }

    res.status(200).json({ encryptedPassword: Buffer.from(entry.password).toString('base64') });
}
