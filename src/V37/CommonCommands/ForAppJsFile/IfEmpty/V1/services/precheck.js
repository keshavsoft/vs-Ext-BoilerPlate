// src/V9/createFullEndpoint/services/precheck.js

import fs from 'fs';
import path from 'path';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const validateTargetPath = ({ targetPath }) => {
    log(`CHECK: targetPath → ${targetPath};`);

    if (!targetPath || !fs.existsSync(targetPath)) {
        log('FAIL: Target folder not found;');
        throw new Error('FOLDER_NOT_FOUND');
    }

    log('PASS: Target folder exists;');
};

const validateEntryFilePath = ({ entryFilePath }) => {
    log(`CHECK: entryFilePath → ${entryFilePath};`);

    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        log('FAIL: Entry file path missing;');
        throw new Error('ENTRY_FILE_MISSING');
    }

    const fileName = path.basename(entryFilePath);

    if (fileName !== 'app.js' && fileName !== 'routes.js') {
        log(`FAIL: Invalid entry file → ${fileName};`);
        throw new Error('INVALID_ENTRY_FILE');
    }

    log(`PASS: Valid entry file → ${fileName};`);
};

const runPrechecks = ({ targetPath, entryFilePath }) => {
    log(`INPUTS → targetPath: ${targetPath}; entryFilePath: ${entryFilePath};`);

    validateTargetPath({ targetPath });
    validateEntryFilePath({ entryFilePath });

    log('PASS: Prechecks completed successfully;');
};

export { runPrechecks };