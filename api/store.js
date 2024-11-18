import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data.json');

export function getPasswords() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}');
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

export function savePassword(id, data) {
    const passwords = getPasswords();
    passwords[id] = data;
    fs.writeFileSync(filePath, JSON.stringify(passwords, null, 2));
}
