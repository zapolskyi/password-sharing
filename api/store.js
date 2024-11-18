import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data.json');

export function getPasswords() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}');
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

export function savePassword(id, passwordData) {
    const passwords = getPasswords();
    passwords[id] = passwordData;
    fs.writeFileSync(filePath, JSON.stringify(passwords));
}

export function deletePassword(id) {
    const passwords = getPasswords();
    delete passwords[id];
    fs.writeFileSync(filePath, JSON.stringify(passwords));
}
