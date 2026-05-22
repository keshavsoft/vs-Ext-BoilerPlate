// src/utils/updateAppUse.js

import fs from 'fs';

function updateAppUse({ appJsPath, useLine }) {
    try {
        let content = fs.readFileSync(appJsPath, "utf-8");

        useLine = normalizeLine(useLine);

        if (content.includes(useLine)) return;

        const lines = content.split('\n');

        const insertIndex = findLineIndex(lines);

        const updatedLines = insertLine(lines, insertIndex, useLine);

        fs.writeFileSync(appJsPath, updatedLines.join('\n'));
    } catch (e) {
        console.error("APP USE ERROR:", e);
    }
};

// ensure app.use
function normalizeLine(line) {
    return line.replace("router.use", "app.use");
};

// find correct line index
function findLineIndex(lines) {
    let lastIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (
            line.startsWith("app.use(") &&
            !line.includes("express.static")
        ) {
            lastIndex = i;
        }
    }

    if (lastIndex !== -1) return lastIndex + 1;

    // fallback: before server.listen
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("server.listen")) {
            return i;
        }
    }

    return lines.length;
};

// insert safely
function insertLine(lines, index, line) {
    const newLines = [...lines];

    newLines.splice(index, 0, line);

    return newLines;
};

export { updateAppUse };