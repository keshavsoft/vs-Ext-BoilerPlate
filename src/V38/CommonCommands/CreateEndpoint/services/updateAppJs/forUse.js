import fs from 'fs';

export function updateAppUse({ appJsPath, useLine }) {
    try {
        let content = fs.readFileSync(appJsPath, "utf-8");

        function findLastAppUseIndex() {
            const regex = /app\.use\(.*\);/g;
            let match, last;
            while ((match = regex.exec(content)) !== null) last = match;
            return last ? last.index + last[0].length : -1;
        }

        function insertLine(index) {
            if (index === -1 || content.includes(useLine)) return content;
            return content.slice(0, index) + "\n" + useLine + content.slice(index);
        }

        const index = findLastAppUseIndex();
        content = insertLine(index);

        fs.writeFileSync(appJsPath, content);
    } catch (e) {
        console.error("APP USE ERROR:", e);
    }
};