import * as vscode from 'vscode';

export async function insertAtPosition(uri, text, line) {
    const editor = await vscode.window.showTextDocument(uri);
    const doc = editor.document;

    const safeLine = Math.min(line, doc.lineCount);

    await editor.edit(edit => {
        edit.insert(new vscode.Position(safeLine, 0), text);
    });

    await doc.save();
};