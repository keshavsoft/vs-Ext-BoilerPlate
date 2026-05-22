import * as vscode from 'vscode';

export async function checkInit(ast, uri) {
    const hasInit = ast.program.body.some(node =>
        node.type === 'VariableDeclaration' &&
        node.declarations.some(d =>
            d.init &&
            d.init.type === 'CallExpression' &&
            d.init.callee.name === 'express'
        )
    );

    if (hasInit) return;

    const action = await vscode.window.showErrorMessage(
        'Missing express app initialization',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `\nconst app = express();\n`;

        await insertAtTop(uri, fix);
    }
}

async function insertAtTop(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    await editor.edit(edit => {
        edit.insert(new vscode.Position(1, 0), text);
    });
};