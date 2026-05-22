// src/V9/createFullEndpoint/services/precheck.js

import fs from 'fs';
import path from 'path';
import { validateAppJsStructure } from "./AppJs/start.js";

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const validateEntryFilePath = ({ entryFilePath }) => {
    log(`CHECK: entryFilePath → ${entryFilePath};`);

    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        log('FAIL: Entry file path missing;');
        throw new Error('ENTRY_FILE_MISSING');
    };

    const fileName = path.basename(entryFilePath);

    if (fileName !== 'app.js' && fileName !== 'routes.js') {
        log(`FAIL: Invalid entry file → ${fileName};`);
        throw new Error('INVALID_ENTRY_FILE');
    };

    validateAppJsStructure({ entryFilePath });

    log(`PASS: Valid entry file → ${fileName};`);
};

export { validateEntryFilePath };