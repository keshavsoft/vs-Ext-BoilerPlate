// src/utils/updateRouteUse.js

import fs from 'fs';

function updateRouteFile({ routeJsPath, useLine }) {
    try {
        let content = readFile(routeJsPath);

        validateInput(content, useLine);

        if (alreadyExists(content, useLine)) return;

        const lines = content.split('\n');

        const insertIndex = decideInsertIndex(lines);

        const updatedLines = insertLine(lines, insertIndex, useLine);

        writeFile(routeJsPath, updatedLines.join('\n'));
    } catch (e) {
        handleError(e);
    };
};

// read
function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
};

// write
function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
};

// validate
function validateInput(content, line) {
    if (!content) throw new Error("Empty file");
    if (!line) throw new Error("Invalid useLine");
};

// exists
function alreadyExists(content, line) {
    return content.includes(line);
};

// decision maker
function decideInsertIndex(lines) {
    const lastUseIndex = findLastRouterUse(lines);

    if (lastUseIndex !== -1) return lastUseIndex + 1;

    return findRouterDeclaration(lines);
};

// find last router.use
function findLastRouterUse(lines) {
    let lastIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith("router.use(")) {
            lastIndex = i;
        }
    }

    return lastIndex;
};

// fallback: after router declaration
function findRouterDeclaration(lines) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("express.Router()")) {
            return i + 1;
        }
    }

    return lines.length;
};

// insert
function insertLine(lines, index, line) {
    const newLines = [...lines];
    newLines.splice(index, 0, line);
    return newLines;
};

// error handler
function handleError(e) {
    console.error("ROUTE USE ERROR:", e.message);
};

export { updateRouteFile };