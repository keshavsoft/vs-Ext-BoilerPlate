// validateAppJsNotEmpty.js (Babel + Toast + Fix)

import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { parse } from '@babel/parser';

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const getAppJsTemplate = (context) => {
    const templateFile = path.join(
        context.extensionPath,
        'src',
        'CommonTemplates',
        'Base',
        'app.js'
    );

    if (!fs.existsSync(templateFile)) {
        throw new Error('TEMPLATE_NOT_FOUND');
    }

    return fs.readFileSync(templateFile, 'utf-8');
};

const validateAppJsNotEmpty = async ({ entryFilePath, context }) => {
    log(`CHECK: app.js not empty → ${entryFilePath};`);

    const content = fs.readFileSync(entryFilePath, 'utf-8');

    const ast = parse(content, {
        sourceType: 'module',
        errorRecovery: true
    });

    const body = ast.program.body;

    if (!body.length) {
        log('FAIL: app.js is empty;');

        const action = await vscode.window.showErrorMessage(
            'app.js has no code. Do you want to scaffold it?',
            'Scaffold Now'
        );

        if (action === 'Scaffold Now') {
            fs.writeFileSync(entryFilePath, getAppJsTemplate(context));
            log('FIX: app.js scaffolded;');
            return 'STOP';   // 👈 important
        };

        throw new Error('APP_JS_EMPTY');
    }

    log('PASS: app.js has valid structure;');
};

export { validateAppJsNotEmpty };