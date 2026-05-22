// src/V2/InitJs/services/precheck.js
import fs from 'fs';
import { fileURLToPath } from 'url';

export function runPrechecks({ targetPath, inTemplatePath }) {
    if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length > 0) {
        throw new Error('FOLDER_NOT_EMPTY');
    }

    const templatePath = fileURLToPath(new URL(inTemplatePath, import.meta.url));
    if (!fs.existsSync(templatePath)) throw new Error('TEMPLATE_MISSING');

    return true;
};