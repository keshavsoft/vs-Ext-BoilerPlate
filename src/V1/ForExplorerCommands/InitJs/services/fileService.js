// src/V2/services/fileService.js

import fs from 'fs';
import path from 'path';
import { entryTemplate } from '../templates/entryTemplate.js';

export function ensureEntryFile({ folderName, dirName }) {
    const folderPath = path.join(dirName, folderName);
    const filePath = path.join(folderPath, "entryFile.js");

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, entryTemplate());
    }

    return filePath;
};