// src/V9/createFullEndpoint/services/Prechecks/ValidateEntryFile/AppJs/validateAppJsNotEmpty.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as vscode from 'vscode';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const getAppJsTemplate = () => {
    const basePath = fileURLToPath(new URL('../../../../../CommonTemplates/Base', import.meta.url));
    const templateFile = path.join(basePath, 'app.js');

    if (!fs.existsSync(templateFile)) {
        vscode.window.showErrorMessage('❌ Template app.js not found.');
        throw new Error('TEMPLATE_NOT_FOUND');
    }

    return fs.readFileSync(templateFile, 'utf-8');
};

const validateAppJsNotEmpty = async ({ entryFilePath }) => {
    log(`CHECK: app.js not empty → ${entryFilePath};`);

    const content = fs.readFileSync(entryFilePath, 'utf-8');

    if (!content || !content.trim()) {
        log('FAIL: app.js is empty;');

        const action = await vscode.window.showErrorMessage(
            'app.js is empty. Do you want to scaffold it?',
            'Scaffold Now'
        );

        if (action === 'Scaffold Now') {
            fs.writeFileSync(entryFilePath, getAppJsTemplate());
            log('FIX: app.js scaffolded;');
            return;
        };

        throw new Error('EMPTY_APP_FILE');
    }

    log('PASS: app.js has content;');
};

export { validateAppJsNotEmpty };