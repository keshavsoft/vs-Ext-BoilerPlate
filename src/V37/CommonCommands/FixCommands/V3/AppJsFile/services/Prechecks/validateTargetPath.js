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

export { validateTargetPath };