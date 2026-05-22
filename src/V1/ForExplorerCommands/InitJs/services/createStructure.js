// src/V3/services/createStructure.js

import fs from 'fs';
import path from 'path';

export function createStructure({ folderPath, files }) {
    Object.entries(files).forEach(([relativePath, content]) => {
        const fullPath = path.join(folderPath, relativePath);

        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, content);
        }
    });
};