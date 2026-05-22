// src/V1/services/folderService.js

import fs from 'fs';
import path from 'path';

export function ensureFolder({ folderName, dirName }) {
    const folderPath = path.join(dirName, folderName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    return folderPath;
}