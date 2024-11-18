import { v4 as uuidv4 } from 'uuid';

let passwords = {}; // Временное хранилище паролей

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password, expiry } = req.body;

        // Генерация уникального ID
        const id = uuidv4();
        passwords[id] = { password, expiry };

        // Отправка ссылки клиенту
        res.json({ link: `${req.headers.origin}/get/${id}` });
    } else {
        res.status(405).json({ message: 'Метод не поддерживается' });
    }
}
