// src/V3/AddEndpoint/services/precheck.js
import fs from 'fs';

export function runPrechecks({ targetPath, appJsPath }) {
    const log = (msg) => console.log(`[AddEndpoint][${new Date().toISOString()}] ${msg}`);

    if (!fs.existsSync(targetPath)) {
        log('FAIL: Target folder not found');
        throw new Error('FOLDER_NOT_FOUND');
    }

    if (!fs.existsSync(appJsPath)) {
        log('FAIL: app.js missing');
        throw new Error('APP_JS_MISSING');
    }

    log('PASS: Prechecks completed');
};