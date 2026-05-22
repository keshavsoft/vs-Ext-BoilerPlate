import fs from 'fs';

export function updateImports1({ appJsPath, importLine }) {
    let content = fs.readFileSync(appJsPath, "utf-8");

    function findLastImportIndex() {
        const regex = /^\s*import.*$/gm;
        let match, last;
        while ((match = regex.exec(content)) !== null) {
            last = match;
        }
        return last ? last.index + last[0].length : -1;
    }

    function insertLine(index) {
        if (index === -1 || content.includes(importLine)) return content;
        return content.slice(0, index) + "\n" + importLine + content.slice(index);
    }

    const index = findLastImportIndex();
    content = insertLine(index);

    fs.writeFileSync(appJsPath, content);
};

export function updateImports({ appJsPath, importLine }) {
    try {
        let content = fs.readFileSync(appJsPath, "utf-8");

        function findLastImportIndex() {
            const regex = /^\s*import.*$/gm;
            let match, last;
            while ((match = regex.exec(content)) !== null) last = match;
            return last ? last.index + last[0].length : -1;
        }

        function insertLine(index) {
            if (index === -1 || content.includes(importLine)) return content;
            return content.slice(0, index) + "\n" + importLine + content.slice(index);
        }

        const index = findLastImportIndex();
        content = insertLine(index);

        console.log("AFTER:\n", content);

        fs.writeFileSync(appJsPath, content);

        console.log("WRITE SUCCESS:", appJsPath);
    } catch (e) {
        console.error("WRITE ERROR:", e);
    }
};