import * as vscode from 'vscode';

export async function expressUse({ ast, uri }) {
    let hasUse = false;

    ast.program.body.forEach(node => {
        if (node.type === 'ExpressionStatement') {
            const expr = node.expression;

            if (
                expr.type === 'CallExpression' &&
                expr.callee?.type === 'MemberExpression' &&
                expr.callee.property?.name === 'use' &&
                expr.arguments?.some(arg =>
                    arg.type === 'CallExpression' &&
                    arg.callee?.object?.name === 'express'
                )
            ) {
                hasUse = true;
            };
        };
    });

    if (hasUse) return;

    const action = await vscode.window.showErrorMessage(
        'Missing app.use middleware',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `\napp.use(express.json());\n`;

        await insertAtBottom(uri, fix);
    };
}

async function insertAtBottom(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    const lastLine = editor.document.lineCount;

    await editor.edit(edit => {
        edit.insert(new vscode.Position(lastLine, 0), text);
    });
}