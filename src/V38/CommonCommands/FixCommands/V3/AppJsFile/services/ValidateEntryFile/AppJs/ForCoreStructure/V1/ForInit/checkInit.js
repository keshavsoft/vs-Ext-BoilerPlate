import * as vscode from 'vscode';
import { hasAppInit } from './helpers/hasAppInit.js';
import { insertAfterImports } from './helpers/insertAfterImports.js';

export async function checkInit({ ast, uri, config }) {

    if (hasAppInit(ast, config)) return;

    const action = await vscode.window.showErrorMessage(
        'Missing express app initialization',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        await insertAfterImports(uri, `\n${config.fixCode}`);

        return;
    }
};