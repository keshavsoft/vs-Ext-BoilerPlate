// src/V9/createFullEndpoint/services/precheck.js

import fs from 'fs';
import path from 'path';

const runPrechecks = ({ targetPath, entryFilePath }) => {
    const timestamp = new Date().toISOString();
    const log = (msg) => console.log(`[CreateFullEndpoint][${timestamp}] ${msg}`);

    log(`INPUTS → targetPath: ${targetPath}; entryFilePath: ${entryFilePath};`);

    if (!targetPath || !fs.existsSync(targetPath)) {
        log('FAIL: Target folder not found;');
        throw new Error('FOLDER_NOT_FOUND');
    }

    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        log('FAIL: Entry file path missing;');
        throw new Error('ENTRY_FILE_MISSING');
    }

    const fileName = path.basename(entryFilePath);
    if (fileName !== 'app.js') {
        log(`FAIL: Invalid entry file → expected app.js but got ${fileName};`);
        throw new Error('INVALID_ENTRY_FILE');
    }

    log('PASS: Prechecks completed successfully;');
};

export { runPrechecks };