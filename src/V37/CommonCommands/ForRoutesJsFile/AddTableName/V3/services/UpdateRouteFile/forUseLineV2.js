// src/utils/updateAppUse.js

import fs from 'fs';

// main
function updateAppUse({ appJsPath, useLine }) {
    try {
        let content = readFile(appJsPath);

        if (alreadyExists(content, useLine)) return;

        const index = findInsertIndex(content);
        const formattedLine = buildLine(useLine);

        const updated = insertAtIndex(content, index, formattedLine);

        writeFile(appJsPath, updated);
    } catch (e) {
        console.error("APP USE ERROR:", e);
    }
};

// step 1
function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
};

// step 2
function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
};

// step 3
function alreadyExists(content, line) {
    return content.includes(line);
};

// step 4
function findInsertIndex(content) {
    const routeRegex = /app\.use\(['"]\/.*['"],.*\);/g;
    let match, last;

    while ((match = routeRegex.exec(content)) !== null) {
        last = match;
    }

    if (last) {
        return last.index + last[0].length;
    }

    const serverMatch = content.match(/server\.listen\(/);

    if (serverMatch) {
        return serverMatch.index;
    }

    return content.length;
};

// step 5
function buildLine(line) {
    return `\n${line}\n`;
};

// step 6
function insertAtIndex(content, index, line) {
    const before = content.slice(0, index);
    const after = content.slice(index);

    return before + line + after;
};

export { updateAppUse };