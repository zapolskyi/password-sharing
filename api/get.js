let passwords = {}; // Временное хранилище паролей

export default function handler(req, res) {
    const { id } = req.query;

    // Проверка существования пароля
    const entry = passwords[id];
    if (!entry) {
        return res.status(404).send('Ссылка не существует.');
    }

    // Проверка срока действия
    const currentTime = Date.now();
    if (currentTime > entry.expiry) {
        delete passwords[id];
        return res.status(410).send('Срок действия ссылки истёк.');
    }

    res.json({ encryptedPassword: Buffer.from(entry.password).toString('base64') });
}
