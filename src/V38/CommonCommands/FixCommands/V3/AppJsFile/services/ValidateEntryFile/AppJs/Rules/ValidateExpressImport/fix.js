// fix.js
import * as vscode from 'vscode';

const fixExpressImport = async () => {
    const editor = vscode.window.activeTextEditor;

    const action = await vscode.window.showErrorMessage(
        'Missing express import',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        await editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(0, 0), `import express from 'express';\n`);
        });
    }
};
export { fixExpressImport };