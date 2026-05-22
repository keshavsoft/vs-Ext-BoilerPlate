import * as vscode from 'vscode';
import { hasUseCheck } from './helpers/hasUse.js';
import { insertAfterInitBlock } from './helpers/insertToFile.js';

export async function checkUse({ ast, uri }) {
    const fromHasUseCheck = hasUseCheck({ ast });

    if (fromHasUseCheck) return;

    const action = await vscode.window.showErrorMessage(
        'Missing app.use middleware',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `\napp.use(express.json());\n`;

        await insertAfterInitBlock(uri, fix);

        return;
    }
};