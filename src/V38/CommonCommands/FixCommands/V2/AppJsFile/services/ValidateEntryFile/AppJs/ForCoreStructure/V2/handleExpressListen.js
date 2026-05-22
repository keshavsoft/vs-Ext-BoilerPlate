import * as vscode from 'vscode';
const startListen = "server";

export async function expressListen(ast, uri) {
    let hasListen = false;

    ast.program.body.forEach(node => {
        if (node.type === 'ExpressionStatement') {
            const expr = node.expression;

            if (
                expr.type === 'CallExpression' &&
                expr.callee.object?.name === startListen &&
                expr.callee.property?.name === 'listen'
            ) {
                hasListen = true;
            }
        }
    });

    if (hasListen) return;

    const action = await vscode.window.showErrorMessage(
        `Missing ${startListen}.listen`,
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `\n${startListen}.listen(3000, () => console.log('Server running'));\n`;

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