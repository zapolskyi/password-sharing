const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Для генерации уникальных ID
const app = express();

const passwords = {}; // Временное хранилище паролей

app.use(bodyParser.json());
app.use(express.static('public')); // Статическая папка для клиента

// Сохранение пароля
app.post('/save', (req, res) => {
    const { password, expiry } = req.body;

    const id = uuidv4();
    passwords[id] = { password, expiry };

    // Возвращаем только ID
    res.json({ id });
});

// Получение пароля
app.get('/get/:id', (req, res) => {
    const { id } = req.params;

    // Проверка, существует ли пароль
    const entry = passwords[id];
    if (!entry) {
        return res.status(404).send('Ссылка не существует.');
    }

    // Проверка срока действия
    const currentTime = Date.now();
    if (currentTime > entry.expiry) {
        delete passwords[id]; // Удаляем истёкшую запись
        return res.status(410).send('Срок действия ссылки истёк.');
    }

    res.json({ encryptedPassword: Buffer.from(entry.password).toString('base64') }); // Отправляем зашифрованный пароль
});

// Удаление записи после использования
app.delete('/get/:id', (req, res) => {
    const { id } = req.params;
    delete passwords[id];
    res.status(200).send('Пароль удалён.');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
