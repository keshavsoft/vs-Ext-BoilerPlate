// validateAppJsNotEmpty.js

import fs from 'fs';
import { parse } from '@babel/parser';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const validateAppJsNotEmpty = ({ entryFilePath }) => {
    log(`CHECK: App.js not empty → ${entryFilePath};`);

    const content = fs.readFileSync(entryFilePath, 'utf-8');

    const ast = parse(content, {
        sourceType: 'module',
        errorRecovery: true
    });

    const body = ast.program.body;

    if (!body.length) {
        log('FAIL: App.js is empty;');
        throw new Error('APP_JS_EMPTY');
    }

    log('PASS: App.js not empty;');
};

export { validateAppJsNotEmpty };