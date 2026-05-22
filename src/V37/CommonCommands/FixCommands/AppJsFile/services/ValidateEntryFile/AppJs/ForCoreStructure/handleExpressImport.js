import * as vscode from 'vscode';

export async function expressImport(ast, uri) {
    const hasImport = ast.program.body.some(node =>
        node.type === 'ImportDeclaration' &&
        node.source.value === 'express'
    );

    if (hasImport) return;

    const action = await vscode.window.showErrorMessage(
        'Missing express import',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `import express from 'express';\n`;

        await insertAtTop(uri, fix);
    };
}

/* helper */
async function insertAtTop(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    await editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), text);
    });
};