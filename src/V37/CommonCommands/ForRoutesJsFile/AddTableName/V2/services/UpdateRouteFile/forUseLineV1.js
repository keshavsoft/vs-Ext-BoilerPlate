// src/utils/updateAppUse.js

import fs from 'fs';

function updateAppUse({ appJsPath, useLine }) {
    try {
        let content = fs.readFileSync(appJsPath, "utf-8");

        const index = findInsertIndex(content);
        content = insertLine(content, index, useLine);

        fs.writeFileSync(appJsPath, content);
    } catch (e) {
        console.error("APP USE ERROR:", e);
    }
};

function findInsertIndex(content) {
    const regex = /app\.use\(.*\);/g;
    let match, last;

    while ((match = regex.exec(content)) !== null) {
        last = match;
    }

    if (last) {
        return last.index + last[0].length;
    }

    return content.length;
};

function insertLine(content, index, line) {
    if (index === -1 || content.includes(line)) return content;

    return content.slice(0, index) + "\n" + line + content.slice(index);
};

export { updateAppUse };