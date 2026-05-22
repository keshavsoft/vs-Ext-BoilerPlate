import * as vscode from 'vscode';

export async function checkImport({ ast, uri, config }) {
    const { moduleName, importCode } = config;

    const hasImport = ast.program.body.some(node =>
        node.type === 'ImportDeclaration' &&
        node.source.value === moduleName
    );

    if (hasImport) return;

    const action = await vscode.window.showErrorMessage(
        `Missing ${moduleName} import`,
        'Fix Now'
    );

    if (action === 'Fix Now') {
        await insertAtTop(uri, importCode);
    }
}

/* helper */
async function insertAtTop(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    await editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), text);
    });
}