// src/V9/createFullEndpoint/services/Prechecks/ValidateEntryFile/appJsStructure.js

import fs from 'fs';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const validateAppJsStructure = ({ entryFilePath }) => {
    log(`CHECK: app.js structure → ${entryFilePath};`);

    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        log('FAIL: Entry file not found;');
        throw new Error('ENTRY_FILE_NOT_FOUND');
    }

    const content = fs.readFileSync(entryFilePath, 'utf-8');

    if (!content || !content.trim()) {
        log('FAIL: app.js is empty;');
        throw new Error('EMPTY_APP_FILE');
    };

    const checks = [
        { key: 'EXPRESS_IMPORT', value: content.includes('import express') || content.includes("require('express')") || content.includes('require("express")') },
        { key: 'APP_INIT', value: content.includes('express()') },
        { key: 'APP_USE', value: content.includes('app.use') },
        { key: 'SERVER_LISTEN', value: content.includes('listen(') }
    ];

    for (const check of checks) {
        if (!check.value) {
            log(`FAIL: Missing ${check.key};`);
            throw new Error(`MISSING_${check.key}`);
        }
        log(`PASS: ${check.key};`);
    }

    log('PASS: app.js structure validated successfully;');
};

export { validateAppJsStructure };