import * as vscode from 'vscode';

export async function insertAfterAppInit(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    const doc = editor.document;

    let insertLine = -1;

    for (let i = 0; i < doc.lineCount; i++) {
        const line = doc.lineAt(i).text;

        if (
            line.includes('const app') &&
            line.includes('express(')
        ) {
            insertLine = i + 1;
            break;
        }
    }

    // fallback if not found
    if (insertLine === -1) {
        insertLine = doc.lineCount;
    }

    await editor.edit(edit => {
        edit.insert(new vscode.Position(insertLine, 0), text);
    });

    await editor.document.save();
};

export async function insertAfterInitBlock(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    const doc = editor.document;

    let insertLine = 0;

    for (let i = 0; i < doc.lineCount; i++) {
        const line = doc.lineAt(i).text.trim();

        // Stop when logic starts
        if (
            line.startsWith('function') ||
            line.includes('app.use') ||
            line.includes('server.listen')
        ) {
            break;
        }

        // Track last init line
        if (
            line.startsWith('const ') ||
            line.startsWith('let ') ||
            line.startsWith('var ')
        ) {
            insertLine = i + 1;
        }
    }

    await editor.edit(edit => {
        edit.insert(new vscode.Position(insertLine, 0), text);
    });

    await editor.document.save();
};