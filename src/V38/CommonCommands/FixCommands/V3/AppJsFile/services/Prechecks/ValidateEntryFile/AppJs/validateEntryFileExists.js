// src/V9/createFullEndpoint/services/Prechecks/ValidateEntryFile/AppJs/validateEntryFileExists.js

import fs from 'fs';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const validateEntryFileExists = ({ entryFilePath }) => {
    log(`CHECK: Entry file exists → ${entryFilePath};`);

    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        log('FAIL: Entry file not found;');
        throw new Error('ENTRY_FILE_NOT_FOUND');
    }

    log('PASS: Entry file exists;');
};

export { validateEntryFileExists };